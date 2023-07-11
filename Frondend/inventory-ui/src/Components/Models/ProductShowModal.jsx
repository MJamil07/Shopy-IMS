import React, { useState } from 'react'
import { Modal, notification } from 'antd'
import axios from 'axios';
// import black from '../'

export default () => {

      const [ isOpen , setOpen ] = useState(false);
      const [ product , setProduct ] = useState(null)
      const [ api , contextHolder ] = notification.useNotification()
      const [ skuCode , setSkuCode ] = useState(0)

      const handleClick = (e) => {

            e.preventDefault();

                  // fetch api for product in skucode
            const url = `https://shopy-ims-api.vercel.app/api/v1/product/getProductCode/${skuCode}`;

            axios.get(url)
                  .then(result => {
                        setProduct(result.data)
                  })
                  .catch(error => {
                        api.error({
                              message : 'Product Search Status .?' ,
                              description : 'Not Found Invalid  ..!'
                        })
                  })
            
                  
      }
      return (
      <>
            {contextHolder}
            <button 
                  onClick={()=> setOpen(true)} 
                  className='btn text-white btn-info ms-3'
                  >
                         Search Product 
            </button>

            <Modal
                open = {isOpen}
                footer = {[]}
                onCancel={()=> setOpen(false)}
                width={1000}
            >     
                  <div style={{display : 'flex' , justifyContent : 'center'}}>
                        <form style={{width : 400}}>
                              <h6 className='text-primary'> Search Product By SKU Code </h6>
                                    <input 
                                          type='number'
                                          placeholder='Enter Sku Code'
                                          className='form-control'
                                          onChange={(e)=> setSkuCode(e.target.value)}
                                    />

                                    <button onClick={handleClick} className='btn btn-dark mt-3'> Search Product </button>
                        </form>
                  </div>

                 { product === null ? <></> :  
                  <div className='mt-4'>
                              <table className='table'>
                                    <thead className='thead' style={{color : 'gray'}}>
                                          <tr>
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

                                          </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                          <td> <img src = {''} width={40} height={40} /> </td>
                                          <td> {product.title} </td>
                                          <td> {product.SKU} </td>
                                          <td className='text-primary'> {product.brand} </td>
                                          <td> {product.size} </td>
                                          <td> {product.width} </td>
                                          <td> {product.height} </td>
                                          <td className='text-warning'> {product.salePrice} </td>
                                          <td className='text-success'> {product.retailPrice} </td>
                                          <td style={{color : `${product.color}`}}> {product.color} </td>
                                    </tr>
                                    </tbody>
                              </table>
                        </div>
                  }
            </Modal>

      </>
      )
}
