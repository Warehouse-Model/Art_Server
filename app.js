// 引入express
const express=require('express')

// 引入路由
const router=require('./router')

// 创建服务器
const app=express()

// 解决跨域问题
app.use(require('cors')())

// 解析表单的数据
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// 在路由之前配置解析token的中间件
const {expressjwt:expressJWT}=require('express-jwt')
const config=require('./config')

app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ["HS256"] }).unless({ path:[/^\/api/]}))

// 注册路由中级件
app.use('/api',router)

// 定义错误中间件
app.use((err,req,res,next)=>{
    if(err.name=="UnauthorizedError"){
        res.send({
            status:201,
            msg:'身份认证失败'
        })
        return
    }
})

// 监听3000端口
app.listen(3000,()=>{
    console.log('服务器启动成功')
})