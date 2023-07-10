import { Schema , Document } from "mongoose"

export interface ISupplier extends Document {
     
      name : string ,
      email : string ,
      address : string ,
      city : string ,
      phoneNumber : number ,
      description : string
      isActive : boolean
}

export interface IProduct extends Document  {

      id : string
      title : string ,
      SKU : number ,
      brand : string ,
      size : 'M' | 'L' | 'S' | 'XL' | 'XXL' ,
      width : number ,
      height : number ,
      length : number ,
      costPrice : number ,
      retailPrice : number ,
      salePrice : number ,
      color : string ,
      isActive : boolean ,
      supplierId : Schema.Types.ObjectId
}

export interface IInventory extends Document  {

      id : Schema.Types.ObjectId ,
      SKU_CODE : number ,
      quantity : number ,
      warehouse : string ,
      location : string ,
      date : Date
}