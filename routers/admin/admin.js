const express = require("express");
//时间格式化模块
const moment = require('moment')
const crypto = require('crypto')
//post获取参数中间件
const bodyParser = require('body-parser');


let router = new express.Router();

//配置bodyParser
// 解析 application/json
router.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
router.use(bodyParser.urlencoded());
// 导入数据库相关配置
let mysql = require("../../config/db");


// 管理员管理首页
router.get('/',function(req,res,next){
	// req.query 获取地址栏的参数  get
	//req.body   获取表单参数
	let search = req.query.search || ''
	mysql.query("select * from `admin` where username like ? order by id desc",[`%${search}%`],function(err,data){
		if (err){
			return ''
		} else{
			data.forEach(item=>{
				item.time = moment(item.time*1000).format('YYYY-MM-DD HH:mm:ss')
			})
			res.render("admin/admin/index.html",{data:data,search:search})
		}
	})
});
//更改用户状态
router.get('/ajax_status',function(req,res,next){
	//接受修改用户状态的数据
	let {id,status}=req.query
	//修改数据
	mysql.query("update `admin` set status = ? where id = ?",[status,id],(err,data)=>{
		if (err){
			return ''
		} else{
			if(data.affectedRows==1){
				res.send('1')
			}else{
                res.send('0')
			}
		}
	})
})
//删除用户
router.get('/ajax_del',function(req,res,next){
    //接受修改用户状态的数据
    let {id}=req.query
    //修改数据
    mysql.query("delete from `admin` where id = ?",[id],(err,data)=>{
        if (err){
            return ''
        } else{
            if(data.affectedRows==1){
                res.send('1')
            }else{
                res.send('0')
            }
        }
    })
})

// 管理员管理添加页面
router.get('/add',function(req,res,next){
	// res.send("管理员管理添加页面");
	// 加载对应管理员添加页面
	res.render("admin/admin/add");
});

// 管理员管理修改页面
router.get('/edit',function(req,res,next){
	let {id} =req.query
	mysql.query('select * from `admin` where id = ?',[id],(err,data)=>{
		if(err)		return ''
		else {
            res.render("admin/admin/edit",{data:data[0]});
		}
	})

});

// 管理员管理增加操作
router.get('/insert',function(req,res,next){
	// 接收表单提交的数据

	let username = req.query.username;
	let password = req.query.password;
	let repassword = req.query.repassword;
	// 判断用户名是否存在

	if (username) {

		// 判断密码是否书写
		if (password) {
			// 判断两次密码是否一致
			if (password == repassword) {
				//判断用户是否存在
				mysql.query("select * from `admin` where username = ?",[username],function(err,data){
					//判断是否有错误
					if(err){
						return ''
					}else{
						if(data.length>=1){
							res.send('<script>alert(\'用户名已存在，请重新注册\');history.go(-1)</script>')
						}else{
							//时间戳
							let time=Math.round((new Date().getTime())/1000)
							//密码加密
                            let md5 = crypto.createHash('md5');
                            password = md5.update(password).digest('hex')
                            // 准备sql语句
                            let sql = `INSERT INTO \`admin\` (username,password,status,time) VALUES ('${username}','${password}',
                             0,'${time}');`;

                            // 执行sql语句
                            mysql.query(sql,function(error,result,fields){
                                // 通过返回结果判断是否成功
                            	if(error){
									return ''
								}
								//result.affectedRows 执行的影响行数
                                if (result.affectedRows==1) {
                                    res.send("<script>alert('添加成功');location.href='/admin/admin'</script>");
                                }else{
                                    res.send("<script>alert('添加管理失败')</script><script>history.go(-1)</script>");
                                }
                            });
						}
					}
				})



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
//管理员修改操作
router.post('/edit',function(req,res,next){
	console.log(req.body)
	let {username,password,id,repassword,status} = req.body
	let sql=''
    //密码加密
	if(password){
        let md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex')
		sql =`update \`admin\` set status = ${status},password = '${password}' where id = ${id}`
	}else{
		sql =`update \`admin\` set status = ${status} where id = ${id}`
	}
	console.log(sql)
	mysql.query(sql,(err,data)=>{
		if(err)		return ''
		else{
			if(data.affectedRows==1){
                res.send("<script>alert('修改成功');location.href='/admin/admin'</script>");
			}else{
                res.send("<script>alert('修改失败');location.go(-1)</script>");
			}

		}
	})
})

router.get('/save',function(req,res,next){
	res.send("管理员管理修改操作");
});

router.get('/delete',function(req,res,next){
	res.send("管理员管理删除操作");
});

module.exports = router;
