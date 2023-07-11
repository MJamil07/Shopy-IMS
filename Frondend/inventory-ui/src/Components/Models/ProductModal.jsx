import React, { useEffect, useState } from 'react';
import {  Button , Modal, notification  } from 'antd';
import axios from 'axios';
import './StyleSheet/style.css'
import { motion } from 'framer-motion';


const ProductModal = ({
              productProbs , 
              reload , 
              setReload , 
              optionName ,
              id
            }) => {

  const [open, setOpen] = useState(false);
  const [suppliers , setSuppliers] = useState([])
  const [ api , contextHolder ] = notification.useNotification()
  const [ isButtonDisabled , setIsButtonDisabled ] = useState(true)
  
  const [ product , setProduct ] = useState({
      title : productProbs.title,
      SKU : productProbs.SKU ,
      brand : productProbs.brand ,
      size : productProbs.size ,
      width : productProbs.width ,
      height : productProbs.height ,
      length : productProbs.length ,
      costPrice : productProbs.costPrice ,
      retailPrice : productProbs.retailPrice ,
      salePrice : productProbs.salePrice ,
      color : productProbs.color ,
      supplierId : productProbs.supplierId 
  })


  useEffect(()=>{

      axios.get('https://shopy-ims-api.vercel.app/api/v1/supplier/showOnlyName')
          .then(res =>{setSuppliers(res.data)})

  } ,[])

  const showModel = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const cleanUpState = () => {

      setProduct({
        title : '',
        SKU : '' ,
        brand : '' ,
        size : '' ,
        width : '' ,
        height : '' ,
        length : '' ,
        costPrice : '' ,
        retailPrice : '' ,
        salePrice : '' ,
        color : '' ,
        supplierId : ''
      })
  }


  const save = (e) => {

    e.preventDefault()
    
    if(optionName === 'Edit') {

      axios.patch(`https://shopy-ims-api.vercel.app/api/v1/product/update/${id}` , product)
          .then(data => {
              setReload(!reload) 
              api.success({
                message : 'Product Updated Status' ,
                description : 'Successfully Product Updated'
              }) 
            })
          .catch(err => api.error({
            message : 'Product Updated Status' ,
            description : 'Product Not Updated Check Error In Log..?'
          }))
     
      onClose()
      return;
    }

    axios.post('https://shopy-ims-api.vercel.app/api/v1/product/add' , product)
      .then(data => {
          setReload(!reload);
          api.success({
            message : 'Product Added Status' ,
            description : 'Successfully Product Added'
          }) 
          cleanUpState()
        })
      .catch(err => api.error({
        message : 'Product Added Status' ,
        description : 'Product Not Added Check Error In Log..?'
      }))

    onClose()
    
  }
 

  function handleInputChanged(e) {
    const {name , value} = e.target
    setProduct({
      ...product ,
      [name] : value
    })

    checkFieldsAreFilled()
  }

  function check() {

      for (const keys of Object.keys(product)) {

          // check if any fields is empty button is disabled so return false 
          if(!product[keys]) {
              return false
          }
      }

      return true
  }

  function checkFieldsAreFilled() {

      if(check()) {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
  }

  return (
    <>
    {contextHolder}
      <Button className='mt-2' type="primary" onClick={showModel}>
        {optionName}
      </Button>

      <motion.div drag>
        <Modal
        
          title="Create a new Product"
          width={760}
          onCancel={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 20 }}
          footer = {[]}
          
        
        >

            <form style={{marginTop : 50}} onSubmit={save}> 
                <div className='d-flex'>
                    <input 
                          name='title' 
                          value={product.title} 
                          type='text' 
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Title' 
                          required
                    />
                    <input
                          name='SKU' 
                          value={product.SKU == 0 ? '' : product.SKU} 
                          type='number' 
                          onChange={handleInputChanged} 
                          className='form-control ms-2' 
                          placeholder='SKU CODE' 
                          required
                    />
                </div>
                <div className='d-flex mt-3'>
                    <input 
                          name='brand' 
                          type='text' 
                          value={product.brand} 
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Brand' 
                          required
                    />
                    <input 
                          name='size' 
                          type='text' 
                          value={product.size} 
                          onChange={handleInputChanged} 
                          className='form-control ms-2' 
                          placeholder='Size must be S | M | L | XL | XXL | XXXL' 
                          required
                    />
                </div>
                <div className='d-flex mt-3'>
                    <input 
                          name='width' 
                          type='number' 
                          value={product.width == '' ? '' : product.width}
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Width' 
                          required
                    />
                    <input 
                          name='height' 
                          type='number' 
                          value={product.height == '' ? '' : product.height} 
                          onChange={handleInputChanged} 
                          className='form-control ms-2' 
                          placeholder='Height' 
                          required
                    />
                </div>
                <div className='d-flex mt-3'>
                    <input 
                          name='length' 
                          type='number' 
                          value={product.length == '' ? '' : product.length} 
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Length' 
                          required
                    />
                    <input 
                          name='costPrice' 
                          type='number' 
                          value={product.costPrice == '' ? '' : product.costPrice} 
                          onChange={handleInputChanged} 
                          className='form-control ms-2' 
                          placeholder='Cost Price' 
                          required
                    />
                </div>
                <div className='d-flex mt-3'>
                    <input 
                          name='retailPrice' 
                          type='number' 
                          value={product.retailPrice == '' ? '' : product.retailPrice} 
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Retail Price' 
                          required
                    />
                    <input 
                          name='salePrice' 
                          type='number' 
                          value={product.salePrice == '' ? '' : product.salePrice} 
                          onChange={handleInputChanged} 
                          className='form-control ms-2' 
                          placeholder='Sale Price' 
                          required
                    />
                </div>
                <div className='d-flex mt-3'>

                      <input 
                          name='color' 
                          type='text' 
                          value={product.color} 
                          onChange={handleInputChanged} 
                          className='form-control' 
                          placeholder='Color' 
                          required
                      />  
                      
                      <div className='drop-down '>
                      <select  onChange={(e) => {
                        setProduct({...product , supplierId : e.target.value })
                        checkFieldsAreFilled()
                      }} className='ms-5'>
                        <option value={product.supplierId} selected hidden disabled> {product.supplierId ? product.supplierId : 'Select Supplier'} </option>
                        {
                          suppliers && suppliers.map((supplier , index) => {
                            return <option value={supplier._id} key={index}> {supplier.name} </option>
                          })
                        }
                      </select>
                      </div>

                </div>

                  <button disabled = {isButtonDisabled} className='btn w-25 mt-3  btn-outline-success'> {optionName} </button>
                
            </form>

        </Modal>
      </motion.div>
    </>
  );
};

export default ProductModal;
