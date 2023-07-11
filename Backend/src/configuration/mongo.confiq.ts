
import mongoose from 'mongoose'

const connectToDB = async () => {

      await mongoose
      .connect('mongodb+srv://root:root@web-app.qfkecpv.mongodb.net/inventory-management' , {retryWrites : true , w : "majority" })
      .then(()=>{
            console.log('DB is Connected');
      })
      .catch(err => {
            console.log(err);     
      })
}


export default connectToDB