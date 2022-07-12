// 引入express
const express=require('express')

// 引入路由处理函数
const {RegUser,login} =require('../router_hanlder')
// 创建路由
const router=express.Router()

// 处理用户注册
router.post('/reguser',RegUser)

// 处理用户登录
router.post('/login',login)

// 将路由暴露出去
module.exports=router
