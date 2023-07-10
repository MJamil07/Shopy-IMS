
import {
      Request ,
      Response
} from 'express'
import Supplier from '../models/supplier.model';
import {InventorySupplierInstance as inventory} from './InventoryCRUD';
import ProductAPI from './product.controller';


const productAPI = new ProductAPI()

class SupplierAPI {
      
     
      addSupplier(request : Request , response : Response) {
            inventory.add(request, response)
      }

      updateSupplier(request : Request , response : Response) {
            console.log('Supplier' , request.params);
            inventory.update(request, response)
      }

      deleteSupplier(request : Request , response : Response) {
            inventory.delete(request, response)
      }

      showSupplier(request : Request , response : Response) {
            inventory.show(request, response)
      }

      searchSupplier(request : Request , response : Response) {
            inventory.search(request, response)

      }

      showOnlyName(request : Request , response : Response) {
           
            return Supplier.find({isActive : true}, {"_id" : 1 , "name" : 1})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

      updateSupplierActiveOrDisActive(request : Request , response : Response) {

            const { _id , isActive } = request.body
            console.log(request.body);
            
            productAPI.updateActiveStatus( _id , isActive )
                        
            return Supplier.updateOne({_id} , {isActive})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
            
      }

      getActiveSupplier(request : Request , response : Response) {

            return Supplier.find({isActive : true})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))

      }

      getDisActiveSupplier(request : Request , response : Response) {

            return Supplier.find({isActive : false})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))

      }

      getOnlySupplierName(request : Request , response : Response) {

            const _id = request.params.id;

            return Supplier.findOne({_id} , {"name" : 1})
                  .then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

}

export default  SupplierAPI