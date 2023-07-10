

import  { Router }  from "express";
import ProductAPI from "../controllers/product.controller";


const router = Router()



const productAPI = new ProductAPI()


// endpoinds
// http://localhost:9090/api/v1/product/* 

router.post('/add' , productAPI.addProduct)
router.get('/show' , productAPI.showProduct)
router.delete('/delete/:id' , productAPI.deleteProduct)
router.patch('/update/:id' , productAPI.updateProduct)
router.get('/search' , productAPI.searchProduct)
router.get('/supplierCost' , productAPI.supplierTotalCost)
router.get('/brandCount' , productAPI.brandCount)
router.get('/getAllSKU' , productAPI.getAllSKUCode)
router.get("/getTotalOfRetailAndCost" , productAPI.getSumOfRetailPriceAndCostPrice)
router.get('/getActiveProduct' , productAPI.getActiveProduct)
router.get('/getProductCode/:id' , productAPI.getProductGivenSku)




export default router