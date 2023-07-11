import React, { useEffect, useState } from 'react';
import {  Modal, notification } from 'antd';
import axios from 'axios';
import './StyleSheet/style.css'
import locations from './entity/location';
import { EditFilled } from '@ant-design/icons';

const InventoryModal = ({
            skucode , 
            quantityProbs ,
            warhouseProbs ,
            locationProbs ,
            addOrEdit ,
            id , 
            reload ,
            setReload
          }) => {

  const [open, setOpen] = useState(false);
  const [isButtonDisable , setIsButtonDisable] = useState(true)
  const [skuCodes , setSkuCodes] = useState([])
  const [currentLocations , setCurrentLocations] = useState(locations.warhouseOne)

  const [skuCode , setSkuCode]  = useState(skucode)
  const [quantity , setQuantity] = useState(quantityProbs)
  const [warhouse , setWarhouse] = useState(warhouseProbs)
  const [location , setLocation] = useState(locationProbs)
   
  const [api , contextHolder] = notification.useNotification();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(()=> {

    axios.get('https://shopy-ims-api.vercel.app/api/v1/product/getAllSKU')
        .then(res => setSkuCodes(res.data))
        .catch(err => console.log(err))

  } , [])

  const cleanUpState = () => {

      setSkuCode(0)
      setQuantity(0)
      setWarhouse('')
      setLocation('')
  }

  const popUpNotify = (message , description , status) => {
    status({message , description})
  }

  const checkAllFieldIsFilled = () => {
      
      if( skuCode !== 0   && 
          quantity !== 0  && 
          warhouse !== '' && 
          location !== '' ) {
            setIsButtonDisable(false)
        }

  }

  const handleChangeWarhouse = (e) => {

      const warhouse = e.target.value

      setWarhouse(warhouse)
      checkAllFieldIsFilled()
      switch(warhouse) {

          case 'WARHOUSE-01' : setCurrentLocations(locations.warhouseOne); break
          case 'WARHOUSE-02' : setCurrentLocations(locations.warhouseTwo); break
          case 'WARHOUSE-03' : setCurrentLocations(locations.warhouseThree); break
          case 'WARHOUSE-04' : setCurrentLocations(locations.warhouseFour); break

      }
  }

  const save = (e) => {

      e.preventDefault()

      if(addOrEdit === 'add') {
        axios.post('https://shopy-ims-api.vercel.app/api/v1/inventory/add/' ,
                  {
                    SKU_CODE : skuCode ,
                    quantity ,
                    warehouse : warhouse , 
                    location
                  }
                  ).then((result)=> { 
                    popUpNotify('Added Status' , 'Successfully Added' , api.success) 
                    setReload(!reload)
                    cleanUpState()
                  })
                  .catch(error => popUpNotify('Added Status' , 'Did not Added ..? ' , api.error))
      }

      if(addOrEdit === 'edit') {
        axios.patch(`https://shopy-ims-api.vercel.app/api/v1/inventory/update/${id}` , 
          {
              SKU_CODE : skuCode ,
              quantity ,
              warehouse : warhouse , 
              location
          })
          .then((result)=> {
            popUpNotify('Edited Status' , 'Successfully Updated' , api.success) 
            setReload(!reload)
          })
          .catch(error => popUpNotify('Edited Status' , 'Did not Edited ..? ' , api.error))
      }

      setIsButtonDisable(true)

  }
  return (
    <>
      {contextHolder}
      <button onClick={showDrawer} className='ms-3 btn btn-outline-dark'>
        {addOrEdit === 'add' ? 'Add Inventory' : <EditFilled/>}
      </button>
      <Modal
        title="Create a new Inventory"
        open={open}
        onCancel={onClose}
        bodyStyle={{ paddingBottom: 20 }}
        footer = {[]}
       >
            <form onSubmit={save}>
                  <h6 className='text-primary'> Product Details </h6>
                  <div className='row product-details'>
                      <div className='drop-down col-6'>
                        <h6> SKU/Code </h6>
                        <select  onChange={(e)=> {
                          setSkuCode(parseInt(e.target.value))
                          checkAllFieldIsFilled()
                        }}>
                            <option value={skuCode} selected disabled hidden>  
                              {skuCode ? skuCode : 'Select Code'}
                            </option>

                            {
                              skuCodes && skuCodes.map((code , index) => {
                                  return <option key={index} value={code.SKU}> {code.SKU} </option>
                              })
                            }
                        </select>
                      </div>
                      <div className='quantity col-6'>
                            <h6 > Quantity </h6>
                            <input 
                              type='number' 
                              className='form-control'
                              placeholder='quantity'
                              value={quantity}
                              onChange={(e) => {
                                  setQuantity(parseInt(e.target.value)) 
                                  checkAllFieldIsFilled()
                                }}
                            />
                      </div>
                  </div>

                  <div className='inventory-details mt-3 row'>
                        <h6 className='text-success'> Inventory Details </h6>
                        <div className='drop-down col-6'>
                            <h6> Warhouse </h6>
                            
                            <select onChange={handleChangeWarhouse}>
                                <option value={warhouse} selected disabled hidden> 
                                    { warhouse ? warhouse : 'Select Warhouse' }  
                                </option>
                                <option value={'WARHOUSE-01'}> WARHOUSE-01 </option>
                                <option value={'WARHOUSE-02'}> WARHOUSE-02 </option>
                                <option value={'WARHOUSE-03'}> WARHOUSE-03 </option>
                                <option value={'WARHOUSE-04'}> WARHOUSE-04 </option>
                            </select>
                        </div>
                        <div className='drop-down col-6'>
                            <h6> Location </h6>
                            
                            <select 
                                onChange={(e) => {
                                      setLocation(e.target.value)
                                      checkAllFieldIsFilled()
                                }}
                            >
                                <option value={location} selected disabled hidden> 
                                  { location ? location : 'Select Location' }  
                                </option>
                                {
                                  currentLocations.map((location , index) => {
                                      return <option key={index} value={location}> {location} </option>
                                  })
                                }
                            </select>
                        </div>
                  </div>

                  <button className='btn btn-success mt-3' disabled = {isButtonDisable} > {addOrEdit.toUpperCase()}  </button>
            </form>
      </Modal>
    </>
  );
};

export default InventoryModal;
