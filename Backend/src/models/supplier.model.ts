
import {Schema , model } from 'mongoose'
import { ISupplier } from '../modelTypes'

const SupplierSchema : Schema = new Schema<ISupplier>({
       
      name : {
            type : String ,
            required : true
      } , 

      email : {
            type : String ,
            required : true ,
            unique : true
            
      } ,

      address : {
            type : String ,
            required : true ,
      } ,

      city : {
            type : String ,
            required : true ,

      } ,

      phoneNumber : {
            type : Number ,
            required : true
      } ,

      description : {
            type : String
      } ,

      isActive : {
            type : Boolean ,
            default : true 
      } ,

} , {versionKey : false})

export default model<ISupplier>('Supplier' , SupplierSchema)