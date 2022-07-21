const express=require('express')

const rouoter=express.Router()

const {addArticle,ArticleLsit,ArtiDele,Details,UpDetails} =require('../router_hanlder/release')

rouoter.post('/add',addArticle)
rouoter.get('/list',ArticleLsit)
rouoter.post('/artidel',ArtiDele)
rouoter.get('/details/:id',Details)
rouoter.post('/details/:id',UpDetails)
module.exports=rouoter