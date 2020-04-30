const express=require('express')
const {ProductController}=require('./../controllers')

const router=express.Router()

router.get('/allproduct', ProductController.allproduct)
router.post('/addproduct', ProductController.addproduct)
router.put('/editproduct/:id', ProductController.editproduct)
router.delete('/deleteproduct/:id', ProductController.deleteproduct)



module.exports=router