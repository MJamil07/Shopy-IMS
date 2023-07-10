
import mongoose from 'mongoose'

const connectToDB = async () => {

      await mongoose
      .connect('mongodb://127.0.0.1:27017/InventoryManagementSystem' , {retryWrites : true , w : "majority" })
      .then(()=>{
            console.log('DB is Connected');
      })
      .catch(err => {
            console.log(err);     
      })
}


export default connectToDB