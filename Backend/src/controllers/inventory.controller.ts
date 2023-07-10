

import { Request , Response } from 'express'
import { InventoryCrudInstance as inventory } from './InventoryCRUD'
import InventoyModel from '../models/inventory.model';

class InventoryAPI {

      public addInvertory(request : Request , response : Response) {            
            inventory.add(request, response);
      }
      public updateInvertory(request : Request , response : Response) {
            inventory.update(request, response);
      }
      public showInvertory(request : Request , response : Response) {
            inventory.show(request, response);
      }
      public deletenvertory(request : Request , response : Response) {
            inventory.delete(request, response);
      }
      public searchvertory(request : Request , response : Response) {
            
            const query = request.query
            console.log(query);

            return InventoyModel.find( query )
                  .then(data => response.status(200).json(data))
                        .catch(err => response.status(500).json(err))
      }

      public eachWarhouseProductCount(request : Request , response : Response) {

            return InventoyModel.aggregate([{
                  $group : { _id : '$warehouse' , countProduct : {$sum : '$quantity'}}
            }]).then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

      public eachWarhouseLocationProductCount(request : Request , response : Response) {

            return InventoyModel.aggregate([{
                  $group : { _id : '$location' , countProduct : {$sum : '$quantity'}}
            }]).then(data => response.status(200).json(data))
                  .catch(err => response.status(500).json(err))
      }

}

export default new InventoryAPI()