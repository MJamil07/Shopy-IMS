
import { Request , Response } from 'express'
import mongoose, { Model }  from 'mongoose'
import Product from '../models/product.model';
import Supplier from '../models/supplier.model';
import Inventory from '../models/inventory.model';


interface CRUD {

      add(request : Request , response : Response   ) : void ,
      update(request : Request , response : Response  ) : void ,
      delete(request : Request , response : Response ) : void ,
      show(request : Request , response : Response ) : void ,
      search(request : Request , response : Response ) : void

}


class Inventories<T> implements CRUD {
      
      private model : Model<T> 

      constructor(model : Model<T>) {
            
            this.model = model;
            console.log('Inventory Object is Created' , this.model);
            
      }

      public add(request: Request, response: Response ) {
                        
            const data = request.body

            const model = new this.model({
                  _id : new mongoose.Types.ObjectId(),
                  ...data
            })
            return model.save()
                  .then((data) => { response.status(200).json(data) })
                  .catch((err) => response.status(500).json(err))
                  
      }

      update(request: Request, response: Response) {

            const id = request.params.id;
            console.table(request.body)
            return this.model
                  .findById(id)
                  .then(model  => {
                        if (model) {
                              model.set(request.body)
                              model.save()
                              .then((model) => { response.status(201).json({model , 'message' : 'Updated'}) })
                              .catch((err) => response.status(500).json(err))
                        } 
                        else 
                              response.status(404).json({message : 'Not Found'})
                  })
                  .catch((err) => response.status(500).json(err))
      }

      delete(request: Request, response: Response ) {

            const id = request.params.id;

            return this.model
                  .findByIdAndDelete(id)
                  .then(model => model ? response.status(201).json({model , message : 'deleted'}) : response.status(404).json('Id not found'))
                  .catch((err) => response.status(500).json(err))

      }

      show(request: Request, response: Response ) {
            
            return this.model.find()
                  .then(allModel => response.status(200).json(allModel))
                  .catch(err => response.status(500).json(err))
      }

      search(request: Request, response: Response) {

            const { name } = request.query

            return this.model
                  .find({name})
                  .then(supplier => {
                        supplier ? response.status(200).json(supplier) : 
                                   response.status(404).json({message : 'Not Found'})
                  })
                  .catch(err => response.status(500).json(err))

      }

}



const InventoryProductInstance =  new Inventories(Product) 
const InventorySupplierInstance =  new Inventories(Supplier) 
const InventoryCrudInstance = new Inventories(Inventory)

export {InventoryProductInstance , InventorySupplierInstance , InventoryCrudInstance}