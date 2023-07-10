

import {
      Request ,
      Response
} from 'express'
import Product from '../models/product.model'
import Supplier from '../models/supplier.model';
import { InventoryProductInstance as inventory } from './InventoryCRUD';



class ProductAPI {
  
      addProduct(request : Request , response : Response) {
            inventory.add(request, response)
      }

      updateProduct(request : Request , response : Response) {            
            inventory.update(request , response)
      }

      updateActiveStatus(supplierId : string , isActive : boolean) {
            console.log(supplierId , isActive , 'Product');
            
            Product.updateMany({supplierId} , {isActive})    
                  .then(data => console.log(data)
                  )
                  .catch(err => console.log(err)
                  )    
      }

      deleteProduct(request : Request , response : Response) {
            inventory.delete(request , response)

      }

      getActiveProduct(request : Request , response : Response) {

            return Product.find({isActive : true })
                        .then(data => response.status(200).json(data))
                        .catch(err => response.status(500).json(err))
      }

      showProduct(request : Request , response : Response) {
            inventory.show(request , response)
      }

      searchProduct(request : Request , response : Response) {

            const { title } = request.query

            return Product
                  .findOne({title})
                  .then(product => {
                        product ? response.status(200).json(product) : 
                                   response.status(404).json({message : 'Not Found'})
                  })
                  .catch(err => response.status(500).json(err))


      }

      supplierTotalCost(_request : Request , response : Response) {

            return Product.aggregate([
                      {
                        $group: {
                          _id: "$supplierId",
                          totalPrice: {
                            $sum: "$retailPrice"
                          }
                        }
                      },
                      {
                        $lookup: {
                          from: Supplier.collection.name, // Name of the "Supplier" collection
                          localField: "_id",
                          foreignField: "_id",
                          as: "supplier"
                        }
                      },
                      {
                        $unwind: "$supplier"
                      },
                      {
                        $project: {
                          _id: 1,
                          totalPrice: 1,
                          supplierName: "$supplier.name"
                        }
                  }
                ])
                .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

      brandCount(_request : Request , response : Response) {

            return Product.aggregate([
                 {
                   $group : {
                        _id : '$brand' ,
                        count : {
                              $sum : 1
                        }
                   }
                 }
            ]).then(data => response.status(200).json(data))
            .catch(err => response.status(500).json(err))
      }

      // inventory needed data
      getAllSKUCode(request : Request , response : Response) {

            return Product.find({isActive : true} , {"SKU" : 1 , "title" : 1})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

      getSumOfRetailPriceAndCostPrice(request : Request , response : Response) {

            return Product.aggregate([{
                  $group : {
                        _id : null ,
                        retailPriceTotal : {$sum : '$retailPrice'} ,
                        costPriceTotal : { $sum : '$costPrice' }
                  } 
            }])
            .then(data => response.status(200).json(data))
            .catch(err => response.status(500).json(err))
      }

      getProductGivenSku(request : Request , response : Response) {

            const SKU = request.params.id;

            return Product.findOne({SKU})
                        .then(data => {
                              data ? response.status(200).json(data) : 
                              response.status(404).json({message : 'Not Found'})
                        })
                        .catch(err => response.status(500).json(err))
      }
     

}

export default ProductAPI