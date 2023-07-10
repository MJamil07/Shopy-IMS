
import { Schema , model } from 'mongoose'
import { IProduct } from '../modelTypes'

const ProductSchema = new Schema<IProduct>({

      title : { type : String , required : true },
      SKU : { type : Number , required : true , unique : true},
      brand : { type : String , required : true },
      size : { type : String , enum : ['M' , 'S' , 'L' , 'XL' , 'XXL'] , required : true },
      width : { type : Number , required : true },
      height : { type : Number , required : true },
      length : { type : Number , required : true },
      costPrice : { type : Number , required : true , default : 0},
      retailPrice : { type : Number , required : true , default : 0 },
      salePrice : { type : Number , required : true , default : 0 },
      color : { type : String , required : true },
      isActive : { type : Boolean , required : true , default : true },
      supplierId : { type : Schema.Types.ObjectId , required : true , ref : 'suppliers' },

} , {versionKey : false})


export default model<IProduct>('Product' , ProductSchema)