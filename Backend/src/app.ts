import express from 'express'
import connectToDB from './configuration/mongo.confiq'
import cors from 'cors'

// routers
import supplierRouter from './routes/supplier.routes'
import productRouter from './routes/product.routes'
import inventoryRouter from './routes/inventory.routes'


const app = express()
console.log("RUNNING" , app)

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

// connect the mongodb
connectToDB()

app.get('/', (req, res) => {res.json('Hello World')})

// supplier routers
app.use('/api/v1/supplier' , supplierRouter)

// product router
app.use('/api/v1/product' , productRouter)

// Inventory router
app.use('/api/v1/inventory' , inventoryRouter)

// handle the unkown endpoint
app.use('*' , (_req , response) => {      
      response.status(404).json({'message' : `url = ${ _req.hostname + _req.baseUrl + _req.url} , method = ${_req.method} , Not Found`})
})



app.listen(9090 , ()=> {
      console.info('Server is Started')
})

export default app;
