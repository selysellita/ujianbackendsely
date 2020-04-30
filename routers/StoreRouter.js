const express=require('express')
const {StoreController}=require('./../controllers')

const router=express.Router()

router.get('/allstore', StoreController.allstore)
router.post('/addstore', StoreController.addstore)
router.put('/editstore/:id', StoreController.editstore)
router.delete('/deletestore/:id', StoreController.deletestore)


module.exports=router