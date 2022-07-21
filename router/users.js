const express =require('express')

const router=express.Router()

const {Users}=require('../router_hanlder/users')

router.get('/list',Users)

module.exports=router