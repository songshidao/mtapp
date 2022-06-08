const express = require('express')
const router = express.Router()
const mtController = require('../controllers/mtController')

router.get('/',mtController.homepage)
// 滑动加载更多
router.post('/load-more',mtController.loadmore)
router.get('/add-restaurant',mtController.addRestaurant)
router.post('/add-restaurant',mtController.addRestaurantPost)
// 渲染页面restaurants.ejs ,同时传入id
router.get('/category/:id',mtController.sortRestaurant)
router.post('/category/:id',mtController.sortRestaurantPost)
router.get('/restaurants/:id',mtController.showRestaurant)
router.post('/search',mtController.searchPost)




module.exports = router


