const express =require('express')

const routers=express.Router()

const {UserInfo,Update,UpdatePwt}=require('../router_hanlder/userinfo')

routers.get('/userinfo',UserInfo)
routers.post('/userinfo',Update)
routers.post('/updatepwd',UpdatePwt)

module.exports=routers