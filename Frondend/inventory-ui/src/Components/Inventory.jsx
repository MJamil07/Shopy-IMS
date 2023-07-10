import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line, 
         LineChart , 
         Tooltip , 
         XAxis , 
         YAxis , 
         CartesianGrid , 
         ComposedChart  , 
         Bar 
  } from 'recharts'
import { DeleteFilled, DeleteOutlined, EditFilled, SearchOutlined  } from '@ant-design/icons'
import InventoryModal from './Models/InventoryModal'
import { Modal, notification } from 'antd'
import ProductShowModal from './Models/ProductShowModal'

export default function Inventory() {

  const [ warhouseTotalProduct , setWarhouseTotalproduct ] = useState([{}])
  const [ locationTotalProduct , setLocationTotalproduct ] = useState([{}])
  
  const [ inventories , setInventories ] = useState([{}])
  const [ reload , setReload ] = useState(false)
  const [ searchQuery , setSearchQuery ] = useState('') 

  const [api , contextHolder] = notification.useNotification()
  
  
  useEffect(()=> {

      //  get all inventories details
      axios.get('http://localhost:9090/api/v1/inventory/show')
           .then(res => {setInventories(res.data)})

      // get each location how many products available
      axios.get('http://localhost:9090/api/v1/inventory/locationProductCount')
          .then(res => setLocationTotalproduct(res.data))
          .catch(err => console.log(err))

      // get each warhouse how many product are available
      axios.get('http://localhost:9090/api/v1/inventory/warhouseProductCount')
          .then(res => setWarhouseTotalproduct(res.data))
          .catch(err => console.log(err))


  } , [reload])

  function search() {

      let url = 'http://localhost:9090/api/v1/inventory'
    
      if(searchQuery.substring(0 , 8) === 'WARHOUSE') {
          url += `/search?warehouse=${searchQuery}`
      } 
      
      else if(searchQuery.substring(0 , 3) === 'WAR') {
          url += `/search?location=${searchQuery}`
      }

      else {
          url += '/show'
      }
      axios.get(url)
          .then(result => setInventories(result.data) )
          .catch(error => alert(error))
  }

  const popUpNotify = (message , description , status) => {
      status({message , description})
  }

  const deleteInventory = (id) => {
     Modal.confirm({
        title : 'Are You Sure Delete ?' ,
        icon : <DeleteOutlined /> ,
        onOk : () => {
            axios.delete(`http://localhost:9090/api/v1/inventory/delete/${id}`)
              .then(result => {
                setReload(!reload)
                popUpNotify('Deleted Status' , 'Successfully Deleted' , api.success)
              })
              .catch(error => popUpNotify('Deleted Status' , 'Server Error ..?' , api.error))

        }
     })
  }
  
  return (
    <div className='container'>
      {contextHolder}
       <div className='d-flex'>
          <div className='analytics-container'>
              <div style={{display : 'flex' , flexDirection : 'column'}}>
                  <div className='warhouse-product-total'>
                     <h6 className='text-primary text-center'> Total Products in Warhouses </h6>
                     { warhouseTotalProduct && <LineChart width={400} height={250} data={warhouseTotalProduct}>
                          <XAxis dataKey={'_id'} />
                          <Tooltip/>
                          <YAxis dataKey={'countProduct'} />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line type={'monotone'} stroke="#8884d8" dataKey={'countProduct'} />
                      </LineChart>}
                  </div>

                  <div className='warhouse-product-total text-center'>
                    <h6 className='text-success'> Total Products in Locations </h6>
                     { locationTotalProduct &&
                      <ComposedChart data={locationTotalProduct} width={400} height={250} >
                           <XAxis dataKey={'_id'} />
                           <Tooltip/>
                           <YAxis dataKey={'countProduct'} />
                           <CartesianGrid strokeDasharray="3 3" />
                           <Bar dataKey="countProduct" fill="#82ca9d" />
                      </ComposedChart>
                     }
                  </div>

              </div>
          </div>
          
          <div className='inventory-info ms-3'>
            
            <div className='d-flex'>

              <input 
                   className='form-control w-50' 
                   type='text' 
                   placeholder='Search'
                   onChange={(e) => 
                    setSearchQuery(e.target.value)
                   } 
                    />

              <button onClick={search} className='btn ms-3 btn-success' > 
                    <SearchOutlined/>   
              </button>
              
              <InventoryModal 
                  skucode = {0} 
                  quantityProbs = {0}
                  warhouseProbs = {''} 
                  locationProbs = {''} 
                  addOrEdit = {'add'} 
                  reload={reload}
                  setReload={setReload}
              />

              <ProductShowModal />
            </div>
          
            <div className='table-info'>
            <table className='table  ' >
                <thead className='thead' style={{color : 'gray'}}>
                  <tr>
                    <th scope='col'> No </th>
                    <th scope='col'> SKU </th>
                    <th scope='col'> Quantity </th>
                    <th scope='col'> Warhouse </th>
                    <th scope='col'> Location </th>
                    <th scope='col'> Date </th>
                  </tr>
                </thead>
                <tbody>
                  {inventories && inventories.slice(0 , 7).map((inventory , index) => {

                    return <tr key={index}>
                        <td> {index} </td>
                        <td  className='text-success'> {inventory.SKU_CODE} </td>  
                        <td> {inventory.quantity} </td>       
                        <td className='text-primary'> {inventory.warehouse} </td>       
                        <td style={{textShadow : '0px 0px 1px yellow'}} className='text-warning'> {inventory.location} </td>
                        <td> {inventory.date} </td>  
                        <td onClick={()=> deleteInventory(inventory._id )}> <button className='btn btn-outline-danger'> <DeleteFilled/> </button>  </td> 
                        <td> 
                            <InventoryModal 
                                skucode = {inventory.SKU_CODE} 
                                quantityProbs = {inventory.quantity}
                                warhouseProbs = {inventory.warehouse} 
                                locationProbs = {inventory.location} 
                                addOrEdit = {'edit'} 
                                id={inventory._id}
                                reload={reload}
                                setReload={setReload}
                            />  
                        </td>    

                    </tr>
                  }) }

                </tbody>
            </table>
            </div>
          </div>

       </div>
    </div>
  )
}
