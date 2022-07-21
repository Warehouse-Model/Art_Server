const { db } = require("../db")

exports.Users=(req,res)=>{
    const sql=`select * from users`

    db.query(sql,(err,results)=>{
        if(err){
            res.send({
                status:201,
                msg:'用户信息查询失败'
            })
            return
        }
        let uses=[]
        results.map((item)=>{
            uses.push({...item,password:''})
        })
        res.send({
            status:200,
            msg:'数据查询成功',
            data:uses
        })
    })
}