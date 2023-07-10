

import { Router } from 'express'
import InventoryAPI from '../controllers/inventory.controller'

const router = Router()


// endpoinds
// http://localhost:9090/api/v1/inventory/* 


router.post('/add' , InventoryAPI.addInvertory)
router.patch('/update/:id' , InventoryAPI.updateInvertory)
router.delete('/delete/:id' , InventoryAPI.deletenvertory)
router.get('/show' , InventoryAPI.showInvertory)
router.get('/search' , InventoryAPI.searchvertory)
router.get('/warhouseProductCount' , InventoryAPI.eachWarhouseProductCount)
router.get('/locationProductCount' , InventoryAPI.eachWarhouseLocationProductCount)


export default router
