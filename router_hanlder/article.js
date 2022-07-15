// 引入mysql数据库文件
const { db } = require('../db/index')

// 文章分类列表
exports.Types = (req, res) => {
    const sql = `select * from article_cate where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '数据查询失败'
            })
            return
        }
        res.send({
            status: 200,
            msg: '数据查询成功',
            date: results
        })
    })
}

// 添加文章分类
exports.AddArticle = (req, res) => {
    const aicbox = req.body
    const sql = `select * from article_cate where name='${aicbox.name}' or alias='${aicbox.alias}'`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: "查询错误"
            })
            return
        }
        if (results.length == 2) {
            res.send({
                status: 201,
                msg: '分类名与别名被占用'
            })
            return
        }
        if (results.length == 1 && results[0].name == aicbox.name && results[0].alias == aicbox.alias) {
            res.send({
                status: 201,
                msg: '分类名别名都已被占用'
            })
            return
        }
        if (results.length == 1 && results[0].name == aicbox.name) {
            res.send({
                status: 201,
                msg: '分类名称已经被占用'
            })
            return
        }
        if (results.length == 1 && results[0].alias == aicbox.alias) {
            res.send({
                status: 201,
                msg: '别名已经被占用'
            })
            return
        }
    })
    const sqls = `insert into article_cate (name,alias) values('${aicbox.name}','${aicbox.alias}')`

    db.query(sqls, (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 201,
                msg: '分类添加失败'
            })
            return
        }
        res.send({
            status: 200,
            msg: '添加成功'
        })
    })
}

// 删除文章分类
exports.Deletes = (req, res) => {

    const sql = `update article_cate set is_delete =1 where id=${req.params.id}`

    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '删除失败'
            })
            return
        }
        res.send({
            status: 200,
            msg: '删除成功'
        })
    })
}

// 根据id获取文章分类信息
exports.Cates = (req, res) => {
    const sql = `select * from article_cate where id=${req.params.id}`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '信息查询失败'
            })
            return
        }
        res.send({
            status: 200,
            msg: '查询成功',
            date: results[0]
        })
    })
}

// 根据id修改文章分类信息
exports.UpdateCate = (req, res) => {
    const sql = `select * from article_cate where id=${req.params.id} and (name='${req.body.name}' or alias='${req.body.alias}')`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: '查询失败'
            })
            return
        }
        if (results.length == 2) {
            res.send({
                status: 201,
                msg: '分类名称与别名重复'
            })
            return
        }
        if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) {
            res.send({
                status: 201,
                msg: '分类名称与别名重复'
            })
            return
        }
        // if(results.length==1&&results[0].name==req.body.name){
        //     res.send({
        //         status:201,
        //         msg:'分类名称重复'
        //     })
        //     return
        // }
        // if(results.length==1&&results[0].alias==req.body.alias){
        //     res.send({
        //         status:201,
        //         msg:'别名重复'
        //     })
        //     return
        // }
        const sqls = `update article_cate set name='${req.body.name}',alias='${req.body.alias}' where id=${req.params.id}`
        db.query(sqls, (err, results) => {
            if (err) {
                res.send({
                    status: 201,
                    msg: '修改失败'
                })
                return
            }
            res.send({
                status: 200,
                msg: '修改成功'
            })
        })

    })
}