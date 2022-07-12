// 引入数据库文件
const mysql =require('mysql')

// 连接数据库
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'article'
})

// 向外导出数据库
exports.db=db