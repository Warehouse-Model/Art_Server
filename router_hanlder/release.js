const { db } = require("../db")

exports.addArticle = (req, res) => {

    const sql = `insert into articles (title,content,cover_img,pub_date,cate_id,author_id)
     values('${req.body.title}','${req.body.content}','${req.body.cover_img}','${req.body.pub_date}',${req.body.cate_id},${req.body.author_id})`
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 201,
                msg: "文章发表失败"
            })
            return
        }
        res.send({
            status: 200,
            msg: '发布成功'
        })
    })
}

// 查询文章数据
exports.ArticleLsit = (req, res) => {
    const sql = `select * from articles limit ${(req.query.page - 1) * req.query.size},${req.query.size}`
    const sqls = `select * from users`
    const typesql = `select * from article_cate where is_delete=0`
    const nums = `select * from articles`
    function Info(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }
    async function Fun() {
        try {
            const list = await Info(sql)
            const users = await Info(sqls)
            const type = await Info(typesql)
            const num = await Info(nums)
            list.map((item) => {
                users.map((items) => {
                    if (item.author_id == items.id) {
                        item.author_id = items.username
                    }
                })
            })
            list.map((i) => {
                type.map((is) => {
                    if (i.cate_id == is.id) {
                        i.cate_id = is.name
                    }
                })
            })
            res.send({
                status: 200,
                msg: '查询成功',
                data: list,
                num: num.length
            })

        } catch (e) {
            res.send({
                status: 201,
                msg: '数据查询失败'
            })
        }
    }
    Fun()
}

// 删除文章
exports.ArtiDele = (req, res) => {
    const sql = `delete from articles where id=${req.body.id}`
    db.query(sql, (err, results) => {
        if (err) {
            res.send({
                status: 201,
                msg: "删除失败"
            })
            return
        }
        res.send({
            status: 200,
            msg: '删除成功'
        })
    })
}

// 获取文章的详情信息
exports.Details = (req, res) => {
    const sql = `select * from articles where id=${req.params.id}`
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
            data: results[0]
        })
    })
}

// 修改文章的详情信息
exports.UpDetails = (req, res) => {
    console.log(req.body.content)
    const sqs = `update  articles set title='${req.body.title}',content="${req.body.content}",cover_img="${req.body.cover_img}",
    pub_date='${req.body.pub_date}',cate_id=${req.body.cate_id},author_id=${req.body.author_id} where id=${req.params.id}`

    db.query(sqs, (err, results) => {
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
}