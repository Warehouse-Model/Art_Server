const express=require('express')

const router=express.Router()
const {Types,AddArticle,Deletes,Cates,UpdateCate}=require('../router_hanlder/article')


router.get('/cates',Types)  
router.post('/addcates',AddArticle)
router.get('/deletecates/:id',Deletes)
router.get('/cates/:id',Cates)
router.post('/updatecate/:id',UpdateCate)

module.exports=router