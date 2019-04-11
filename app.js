// 导入express框架
const express = require("express");

// 初始化express
const app = express();

// 设置模板引擎相关信息

const ejs = require("ejs");

// 设置模板的存放目录

// 第一个参数：固定的
// 第二个参数：模板存在的目录
app.set("views",'./views');

// 定义使用的模板引擎
// 第一个参数：模板引擎的名称，模板引擎的后缀
// 第二个参数：使用模板引擎的方法
app.engine("html",ejs.__express);

// 在app中注册模板引擎

// 第一个参数：固定不变
// 第二个参数：与定义的模板引擎的名称有关
app.set("view engine","html");


// 设置静态资源的访问

app.use("/public",express.static(__dirname+"/public"));

//导入前台的路由文件
const indexRouter = require('./routers/index')

//导入后台的路由文件
const adminRouter = require('./routers/admin')
//使用前台路由
//参数一：匹配路由规则
//参数二：请求路由规则
app.use('/',indexRouter)
app.use('/admin',adminRouter)

// 完善blog项目首页的路由

// app.get('/',function(req,res,next){
//     // req request对象 保存客户端请求的相关信息
//     // res response对象 服务器端输入相应
//     // next 执行下一个方法
//
//     // 给页面输出一段文字
//     // res.send("我是blog项目首页");
//
//     // 加载页面
//
//     res.render("home/index");
//
// });

// 监听服务器
app.listen(8080,function(){
    console.log("node 服务器已启动 端口8080");
});
