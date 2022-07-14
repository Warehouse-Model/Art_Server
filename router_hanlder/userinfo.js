// 引入mysql数据库文件
const { db } = require('../db/index')
const bcrypt = require('bcryptjs')

// 查询用户信息
exports.UserInfo = (req, res) => {
    const sql = `select id,username,nickname,email,user_pic from users where id=${req.auth.id}`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '用户信息查询失败'
            })
            return
        }
        if (results.length !== 1) {
            res.send({
                status: 201,
                msg: '用户信息查询失败'
            })
            return
        }
        res.send({
            status: 200,
            msg: '获取用户信息成功',
            data: results[0]
        })
    })
}

// 修改用户信息
exports.Update = (req, res) => {
    const userinfo = req.body
    if (!userinfo.id || !userinfo.username || !userinfo.email) {
        res.send({
            status: 201,
            msg: "必传参数不能为空"
        })
        return
    }
    const sql = `update users set username ='${userinfo.username}',email='${userinfo.email}',user_pic='${userinfo.url}' where id=${userinfo.id}`

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 201,
                msg: "信息更新失败"
            })
            return
        }
        res.send({
            status: 200,
            msg: "资料修改成功"
        })
    })

}

// 重置密码
exports.UpdatePwt = (req, res) => {
    const pwdbox = req.body
    if(!pwdbox.oldPwd||!pwdbox.newPwd||!pwdbox.id){
        res.send({
            status:201,
            msg:'必传参数项没有传值'
        })
        return
    }
    if (pwdbox.oldPwd == pwdbox.newPwd) {
        res.send({
            status: 201,
            msg: '新密码不能与旧密码一致'
        })
        return
    }
    const sql = `select * from users where id=${pwdbox.id}`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: "查询错误"
            })
            return
        }
        if (results.length !== 1) {
            res.send({
                status: 201,
                msg: '用户不存在'
            })
            return
        }
        const compar = bcrypt.compareSync(pwdbox.oldPwd, results[0].password)

        if (!compar) {
            res.send({
                status: 201,
                msg: '原密码不正确'
            })
            return
        }

        pwdbox.newPwd=bcrypt.hashSync(pwdbox.newPwd,10)

        const sqls=`update users set password='${pwdbox.newPwd}' where id=${pwdbox.id}`

        db.query(sqls,(err,results)=>{
            if(err){
                
                res.send({
                    status:201,
                    msg:'修改密码失败'
                })
                return
            }
            res.send({
                status:200,
                msg:'修改成功,请重新登录'
            })
        })
    })
}