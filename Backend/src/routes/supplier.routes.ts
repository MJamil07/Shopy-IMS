

import  { Router }  from "express";
import SupplierAPI from "../controllers/supplier.controller";

const router = Router()


const supplierAPI = new SupplierAPI()


// endpoinds
// http://localhost:9090/api/v1/supplier/* 

router.post('/add' , supplierAPI.addSupplier)
router.get('/show' , supplierAPI.showSupplier)
router.delete('/delete/:id' , supplierAPI.deleteSupplier)
router.patch('/update/:id' , supplierAPI.updateSupplier)
router.get('/search' , supplierAPI.searchSupplier)
router.get('/showOnlyName' , supplierAPI.showOnlyName)
router.post('/updateSupplierActiveStatus' , supplierAPI.updateSupplierActiveOrDisActive)
router.get('/getActiveSupplier' , supplierAPI.getActiveSupplier)
router.get('/getDisActiveSupplier' , supplierAPI.getDisActiveSupplier)
router.get('/getSupplierName/:id' , supplierAPI.getOnlySupplierName)

export default router