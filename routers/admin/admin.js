let express = require("express");

let router = new express.Router();

// 导入数据库相关配置

let mysql = require("../../config/db");


// 管理员管理首页
router.get('/',function(req,res,next){
	res.send("管理员管理首页");
});

// 管理员管理添加页面
router.get('/add',function(req,res,next){
	// res.send("管理员管理添加页面");
	// 加载对应管理员添加页面
	res.render("admin/admin/add");
});

// 管理员管理修改页面
router.get('/edit',function(req,res,next){
	res.send("管理员管理修改页面");
});

// 管理员管理增加操作
router.get('/insert',function(req,res,next){
	// 接收表单提交的数据

	let username = req.query.username;
	let password = req.query.password;
	let repassword = req.query.repassword;
	console.log(mysql)
	// 判断用户名是否存在

	if (username) {

		// 判断密码是否书写
		if (password) {
			// 判断两次密码是否一致
			if (password == repassword) {

				// 准备sql语句
				let sql = `INSERT INTO \`admin\` (username,password,status) VALUES ('${username}','${password}', 0);`;

				// 执行sql语句
				console.log(sql)
				mysql.query(sql,function(error,result,fields){

					// 通过返回结果判断是否成功

					if (result.affectedRows) {
						res.redirect("/admin/admin");
					}else{
						res.send("<script>alert('添加管理失败')</script><script>history.go(-1)</script>");
					}
				});

			}else{
				res.send("<script>alert('两次密码不一致')</script><script>history.go(-1)</script>");
			}
		}else{
			res.send("<script>alert('请输入密码')</script><script>history.go(-1)</script>");

		}
	}else{
		res.send("<script>alert('请输入用户名')</script><script>history.go(-1)</script>");
	}
});

router.get('/save',function(req,res,next){
	res.send("管理员管理修改操作");
});

router.get('/delete',function(req,res,next){
	res.send("管理员管理删除操作");
});

module.exports = router;
