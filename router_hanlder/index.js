// 配置路由处理函数的文件

// 引入mysql数据库文件
const { db } = require('../db/index')

// 引入加密文件
const bcrypt = require('bcryptjs')

// 引入生成token的包
const jwt=require('jsonwebtoken')

// 导入全局配置文件
const config=require('../config')
// 关于注册的处理函数
exports.RegUser = (req, res) => {

    // 表单数据进行验证
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        res.send({
            status: 201,
            msg: '用户名或密码不能为空'
        })
        return
    }
    // 查询用户名在数据库中是否重复
    const sql = `select * from users where username='${userinfo.username}'`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '用户名或密码不合法'
            })
            return
        } else if (results.length > 0) {
            res.send({
                status: 201,
                msg: '用户名重复,请更换用户名'
            })
            return
        }

        // 调用bcryt.hashSync进行密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        //    定义存储用户名密码的sql
        const sqls = `insert into users set username='${userinfo.username}',password='${userinfo.password}'`

        // 执行sql语句
        db.query(sqls, (err, results) => {
            if (err) {
                res.send({
                    status: 201,
                    msg: '注册失败'
                })
                return
            }
            res.send({
                status: 200,
                msg: '注册成功'
            })
        })
    })
}

// 关于登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        res.send({
            status: 201,
            msg: '用户名或密码不能为空'
        })
        return
    }
    const sql = `select * from users where username='${userinfo.username}' `

    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '登录失败,请稍后再试'
            })
            return
        }
        if (results.length < 1) {
            res.send({
                status: 201,
                msg: '当前用户尚未注册'
            })
            return
        }

        // 判断密码是否正确
        const compar = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compar) {
            res.send({
                status: 201,
                msg: '用户名或密码不正确'
            })
            return
        }

        // 用户名密码正确生成token字符串
        const user={...results[0],password:""}

        // 对用户的信息进行加密 生成token字符串
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:'12h'})

        // 将token值响应给客户端
        res.send({
            status:200,
            msg:'登录成功',
            token:'Bearer '+tokenStr
        })

    })

}

