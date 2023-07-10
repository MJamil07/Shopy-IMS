import React, { useEffect, useState } from 'react'
import {
    BarChart , 
    Bar , 
    XAxis , 
    YAxis , 
    Tooltip , 
    CartesianGrid, 
    LineChart,
    Line
} from 'recharts'
import axios from 'axios'
import black from '../Assets/black.jpg'
import blue from '../Assets/blue.jpg'
import green from '../Assets/green.jpg'
import jean from '../Assets/jean.jpg'
import red from '../Assets/red.jpg'
import white from '../Assets/white.jpg'
import ProductModal from './Models/ProductModal'
import { 
    DeleteFilled , 
    ExclamationCircleFilled , 
    ForwardFilled , 
    BackwardFilled 
  } from '@ant-design/icons'
import { Modal, notification } from 'antd'

export default function Product() {

  const [ reload , setReload ] = useState(false)
  const [ products , setProducts ] = useState([])
  const [ suppliersCost , setSuppliersCost ] = useState([])
  const [ brandCounts , setBrandCount] = useState([])
  const [ pageStart , setPageStart ] = useState(0)
  const [ pageEnd , setPageEnd ] = useState(4)
  const [ sumOfRetailAndCostPrice , setSumOfRetailAndCostPrice ] = useState({})
  const [ api , contextHolder ] = notification.useNotification()
    


  useEffect(()=> {

    // get all active products
    axios.get('http://localhost:9090/api/v1/product/getActiveProduct')
          .then(res => {
              setProducts(res.data)
            })

    // get suppliers sell total cost 
    axios.get('http://localhost:9090/api/v1/product/supplierCost/')
          .then(res =>{ 
              setSuppliersCost(res.data)
            })

    //  get each brand how many product available
    axios.get('http://localhost:9090/api/v1/product/brandCount/')
        .then(res =>{ 
            setBrandCount(res.data)
          })

    // get retail and cost total Price

    axios.get('http://localhost:9090/api/v1/product/getTotalOfRetailAndCost/')
          .then(res => {
              setSumOfRetailAndCostPrice(res.data[0])
          })

  },[reload])

  function getColoredCloths(color) {
      switch(color) {

          case 'black' : return black
          case 'blue' : return blue
          case 'green' : return green
          case 'red' : return red
          case 'white' : return white

          default : return jean
      }
  }

  function deleteTheProduct(id) {
    Modal.confirm({
      title : ' Are you confirm to delete the Product ?' ,
      icon : <ExclamationCircleFilled />,
      onOk(){
        axios.delete(`http://localhost:9090/api/v1/product/delete/${id}`)
          .then(res => {
            setReload(!reload)
            api.success({message : 'Product Deleted Or Not ?' , description : 'Successfully Product is Deleted ..!'})
          })
          .catch(error => {
            api.error({message : 'Product Deleted Or Not ?' , description : 'Product is Not Deleted ..!'})
          })
      }
    })
  }

  function pageForward() {

      if(pageEnd >= products.length) {
         setPageStart(0)
         setPageEnd(4)
      } else {
        setPageStart(pageStart + 4)
        setPageEnd(pageEnd + 4)

      }
  }
  function pageBackward() {

      if(pageStart <= 0) {
        setPageStart(0)
        setPageEnd(4)
      } else {
        setPageStart(pageStart - 4)
        setPageEnd(pageEnd - 4)
      }
  }

  return (
    <div className='container'>
        {contextHolder}
        <div className='d-flex'>

          <div className='each-suppliers-total-cost'>
              <h6 className='mb-4 tsxt-primary' style={{marginLeft : 100}}> Total Cost of Each Suppliers </h6>
              { suppliersCost && 
                <BarChart width={400} height={200} data={suppliersCost} >
                  <XAxis dataKey= 'supplierName'/>
                  <YAxis dataKey= 'totalPrice'/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip/>
                  <Bar dataKey= 'totalPrice' fill='#82ca9d' />
                </BarChart>
              }
          </div>
          
          <div className='each-brand-counts'>
            <h6 className='mb-4 tsxt-primary' style={{marginLeft : 100}}> Available Brands Cloths Count </h6>     
             { brandCounts && <LineChart width={400} height={200} data={brandCounts}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>}
          </div>

          <div 
              className='cost-info ms-5 mt-5' 
              style={{display : 'flex' , flexDirection : 'column' }}>

                <span style={{height : 15 , width : 15}} className='bg-warning'></span> <span> RETAIL TOTAL PRICE = { sumOfRetailAndCostPrice.retailPriceTotal && sumOfRetailAndCostPrice.retailPriceTotal} </span>
                <span style={{height : 15 , width : 15}} className='bg-primary mt-2'></span> <span> SALE TOTAL PRICE = {sumOfRetailAndCostPrice.costPriceTotal && sumOfRetailAndCostPrice.costPriceTotal} </span>
                <span style={{height : 15 , width : 15}} className='bg-success mt-2'></span> <span> Profit = {sumOfRetailAndCostPrice.costPriceTotal && sumOfRetailAndCostPrice.retailPriceTotal - sumOfRetailAndCostPrice.costPriceTotal} </span>
              
              <ProductModal 
                    reload={reload}
                    setReload={setReload}
                    productProbs={{
                      title : '',
                      SKU : 0 ,
                      brand : '' ,
                      size : '' ,
                      width : 0 ,
                      height : 0 ,
                      length : 0 ,
                      costPrice : 0 ,
                      retailPrice : 0,
                      salePrice : 0 ,
                      color : ''
                    }}
                    optionName={'Add Product'}
              />

          </div>

        </div>
              
        <div className='table-info'>
          <table className='table table-responsive  ' >
              <caption> 
                List the all Products : {products && products.length} 
                <button onClick={pageBackward} className='btn ms-4 btn-outline-warning'> <BackwardFilled/> </button> 
                <button onClick={pageForward} className='btn ms-3 btn-outline-primary'> <ForwardFilled/> </button>    
              </caption>
              <thead className='thead' style={{color : 'gray'}}>
                <tr>
                  <th className='text-primary' scope='col'> NO OF </th>
                  <th scope='col'> IMAGE </th>
                  <th scope='col'> TITLE </th>
                  <th scope='col'> SKU </th>
                  <th className='text-primary' scope='col'> BRAND </th>
                  <th scope='col'> SIZE </th>
                  <th scope='col'> WIDTH </th>
                  <th scope='col'> HEIGHT </th>
                  <th className='text-warning' scope='col'> SALE PRICE </th>
                  <th className='text-success' scope='col'> RETAIL PRICE </th>
                  <th scope='col'> COLOR </th>
                  <th scope='col'> DELETE </th>

                </tr>
              </thead>
              <tbody>
                {products && products.slice(pageStart , pageEnd).map((product , index) => {

                  return <tr key={index}>
                      <td className='text-primary'> {index + 1} </td>
                      <td> <img src = {getColoredCloths(product.color)} width={40} height={40} /> </td>
                      <td> {product.title} </td>
                      <td> {product.SKU} </td>
                      <td className='text-primary'> {product.brand} </td>
                      <td> {product.size} </td>
                      <td> {product.width} </td>
                      <td> {product.height} </td>
                      <td className='text-warning'> {product.salePrice} </td>
                      <td className='text-success'> {product.retailPrice} </td>
                      <td style={{color : `${product.color}`}}> {product.color} </td>
                      <td> <button onClick={() => deleteTheProduct(product._id)} className='btn btn-outline-danger'> <DeleteFilled/> </button> </td>
                      <td> <ProductModal 
                                reload={reload} 
                                setReload={setReload}
                                optionName={'Edit'}
                                productProbs={product}
                                id={product._id}
                            /> </td>
                  </tr>
                }) }

              </tbody>
          </table>
        </div>

    </div>
  )
}
