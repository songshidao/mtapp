const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// 创建服务器
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine','ejs')
// app.use(expressLayouts)
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(cookieParser('餐馆cookie'));
app.use(session({ 
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie: { secure: true }

}));
app.use(flash());

// app.set('layout','./layouts/main')

const routes = require('./server/routes/mtRoutes')
app.use('/',routes)

app.listen(port,()=>{
    console.log('监听的端口是'+port);
})