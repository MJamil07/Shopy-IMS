

import mongoose, {
      Schema ,
} from 'mongoose'
import { IInventory } from '../modelTypes'


const InventorySchema : Schema = new Schema<IInventory>({

      SKU_CODE : {
            type : Number ,
            required : true
      } ,

      quantity : {
            type : Number ,
            required : true
      } ,

      warehouse : {
            type : String ,
            enum : ['WARHOUSE-01' , 'WARHOUSE-02' , 'WARHOUSE-03'  , 'WARHOUSE-04'] ,
            required : true
      } ,
      location : {
            type : String ,
            required : true , 
            enum : ['WAR-01-LOC-01' , 'WAR-01-LOC-02' , 'WAR-01-LOC-03' , 'WAR-01-LOC-04' ,
                    'WAR-02-LOC-01' , 'WAR-02-LOC-02' , 'WAR-02-LOC-03' , 'WAR-02-LOC-04' ,
                    'WAR-03-LOC-01' , 'WAR-03-LOC-02' , 'WAR-03-LOC-03' , 'WAR-03-LOC-04' ,
                    'WAR-04-LOC-01' , 'WAR-04-LOC-02' , 'WAR-04-LOC-03' , 'WAR-04-LOC-04' ]
      } ,
      date : {
            type : Date ,
            default : new Date()
      }

} , {versionKey : false})

export default mongoose.model<IInventory>('Inventory' , InventorySchema)
