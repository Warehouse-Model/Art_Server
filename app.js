// 引入express
const express=require('express')

// 引入路由
const router=require('./router')
const routers=require('./router/userinfo')
const artiroute=require('./router/article')
const multer=require('multer')

// 创建服务器
const app=express()

// 解决跨域问题
app.use(require('cors')())

// 解析表单的数据
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/upload',express.static('./upload'))

// 在路由之前配置解析token的中间件
const {expressjwt:expressJWT}=require('express-jwt')
const config=require('./config')

app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ["HS256"] }).unless({ path:[/^\/api/,/^\/file/]}))

// 注册路由中级件
app.use('/api',router)

app.use('/my',routers)

app.use('/my/article',artiroute)

// 处理图片上传
var storage = multer.diskStorage({
    //确定图片存储的位置
    destination: function (req, file, cb) {
        cb(null, './upload')
    },

    //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }

});
const upload = multer({ storage: storage })
app.use('/file/upload',upload.single('file'),(req,res)=>{
    const url = `http://127.0.0.1:3000/upload/${req.file.filename}`
    res.send({
        status: 200,
        msg: "上传成功",
        url
    })
})


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