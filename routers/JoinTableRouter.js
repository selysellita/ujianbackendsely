const express=require('express')
const {JoinTableController}=require('./../controllers')

const router=express.Router()

router.get('/listinventory', JoinTableController.listinventory)




module.exports=router