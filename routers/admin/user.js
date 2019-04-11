let express = require("express");

let router = new express.Router();

// 会员管理首页
router.get('/',function(req,res,next){
	res.send("会员管理首页");
});

// 会员管理添加页面
router.get('/add',function(req,res,next){
	res.send("会员管理添加页面");
});

// 会员管理修改页面
router.get('/edit',function(req,res,next){
	res.send("会员管理修改页面");
});

// 会员管理增加操作
router.get('/insert',function(req,res,next){
	res.send("会员管理添加操作");
});

router.get('/save',function(req,res,next){
	res.send("会员管理修改操作");
});

router.get('/delete',function(req,res,next){
	res.send("会员管理删除操作");
});

module.exports = router;