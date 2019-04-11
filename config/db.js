// 导入mysql扩展

let mysql = require("mysql");

// 设置mysql连接的属性

let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"blog",
});

// mysql连接

connection.connect();

module.exports = connection;
