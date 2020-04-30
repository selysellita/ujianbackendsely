const express=require('express')
const {InventoryController}=require('./../controllers')

const router=express.Router()

router.get('/allinventory', InventoryController.allinventory)
router.post('/addinventory', InventoryController.addinventory)
router.put('/editinventory/:id', InventoryController.editinventory)
router.delete('/deleteinventory/:id', InventoryController.deleteinventory)


module.exports=router