require('../models/db')
// 创建Category集合
const Category = require('../models/Category')
const Restaurant = require('../models/restaurant')
// categories
exports.homepage = async(req,res) => {
    try{
        // 从数据库读取Category集合里的数据:[]数组
        const categories = await Category.find()
        // const restaurants = await Restaurant.find().limit(5)
        // const stars = await Restaurant.find().sort({stars:-1}).limit(5)
        // const hotpot = await Restaurant.find({category:'火锅'}).sort({distance:1}).limit(5)
        // const westernfood = await Restaurant.find({category:'西餐'}).limit(5)
        // const barbecue = await Restaurant.find({category:'烧烤'}).limit(5)
        res.render('index',{title:'MT外卖 - 首页',categories})
    } catch(error){
        res.status(500).send(error.message)
    }
}

exports.loadmore = async(req,res) => {
    const skipNum = parseInt(req.body.skipNum)
    const restaurants = await Restaurant.find().skip(skipNum).limit(2)
    res.json(restaurants)
}

exports.addRestaurant = async(req,res) => {
    const result1 = req.flash('success')
    const result2 = req.flash('fail')
//   res.redirect('/');
   res.render('add-restaurant',{title:'添加餐馆 - MT外卖',result1,result2})
}

exports.addRestaurantPost = async(req,res) => {
    // 需要拿到图片名称和路径
    let imageUploadFile,uploadPath,newImageName
    // 拿到图片名称
    imageUploadFile = req.files.photo
    // 重命名
    newImageName = Date.now() + imageUploadFile.name
    // 确定图片存放路径
    uploadPath = require('path').resolve('./')+'/public/img/restaurant/'+newImageName
    // 把上传的图片放入指定位置
    imageUploadFile.mv(uploadPath)
    try{
        const newRestaurant = new Restaurant({
            name:req.body.name,
            category:req.body.category,
            image:newImageName,
            desc:req.body.intro,
            averageCost:req.body.averageCost,
            promotion:req.body.promotion,
            featured:req.body.featured,
            address:req.body.address
        })
        await newRestaurant.save()
        req.flash('success','图片添加成功')
        res.redirect('/add-restaurant')
    }
    catch(error){
        res.json(error)
        req.files('fail',errormsg)
        res.redirect('/add-restaurant')
    }
 }
//  sortRestaurant
exports.sortRestaurant = async(req,res) => {
    try{
        let categoryId = req.params.id
        res.render('restaurants',{title:'MT外卖 - 首页',categoryId})
    } catch(error){
        res.status(500).send(error.message)
    }
}
exports.sortRestaurantPost = async(req,res) => {
    try{
        let categoryId = req.params.id
        const restaurantList = await Restaurant.find({'category':categoryId})
        res.json(restaurantList)
        // res.render('restaurants',{title:'MT外卖 - 首页',restaurantList})
    } catch(error){
        res.status(500).send(error.message)
    }
}

exports.showRestaurant = async(req,res) => {
    try{
        let categoryId = req.params.id
        const restaurant = await Restaurant.find({'_id':categoryId})

        res.render('restaurant',{title:'MT外卖 - 首页',restaurant})
    } catch(error){
        res.status(500).send(error.message)
    }
}

exports.searchPost = async(req,res) => {
    try{
        let keyword = req.body.mykeyword
        const searchResult = await Restaurant.find({$text:{$search:keyword}})
        res.render('search',{title:'搜索结果',searchResult})
    } catch(error){
        res.status(500).send(error.message)
    }
}