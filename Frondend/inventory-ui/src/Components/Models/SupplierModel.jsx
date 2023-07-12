import React, { useState } from 'react';
import { Button, Modal , notification } from 'antd';
import axios from 'axios';

const SupplierModel = ({     
            reload , 
            setReload , 
            optionName ,
            name ,
            email ,
            address ,
            city ,
            phoneNumber ,
            description , 
            id
      }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api , contextHolder] = notification.useNotification();

  const [isButtonDisable , setIsButtonDisable] = useState(true);
  console.log(isButtonDisable);
  const [supplier , setSupplier] = useState({
      name,
      email,
      address,
      city,
      phoneNumber,
      description
  })

  const showModal = () => {
    setIsModalOpen(true);
  };

  const popUpNotification = ( message , description , notifyStatus ) => {
      notifyStatus({message , description})
  }

  const cleanUptheState = () => {

      // for (const keys in supplier) {
      //       setSupplier({...supplier , [keys] : ''})
      // }
      setSupplier({
                  name : '' , 
                  email : '' , 
                  address : '' , 
                  city : '' , 
                  description : '' , 
                  phoneNumber : ''
            })
      
  }

  const handleOk = (e) => {
    e.preventDefault()
    setIsModalOpen(false);

    if(optionName === 'Edit') {

      axios.patch(`https://shopy-ims-api.vercel.app/api/v1/supplier/update/${id}` , supplier)
            .then(res => {
                  popUpNotification("Updated Status" , "Successfully Updaded" , api.success);
                  setReload(!reload);
            })
            .catch(err => popUpNotification("Updated Status" , " Invalid Data ? " , api.error))

    } 
    else {

      console.log(supplier);
      axios.post('https://shopy-ims-api.vercel.app/api/v1/supplier/add' , supplier)
            .then(res => { 
                         popUpNotification("Added Status" , "Successfully Added" , api.success);
                         setReload(!reload);
                         cleanUptheState()         
                  })
            .catch(err => popUpNotification("Added Status" , " Email is Already Exist !!" , api.error))

    }

   

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkAllAttributesFilled = () => {

      const { 
              name ,
              email , 
              address , 
              city , 
              phoneNumber , 
              description } = supplier


              if (
                  name        !== ''    &&
                  email       !== ''    &&
                  address     !== ''    &&
                  city        !== ''    &&
                  phoneNumber !== 0     &&
                  description !== ''
              ) {
                  setIsButtonDisable(false)
              } else {
                  setIsButtonDisable(true)
              }


  }

  const handleChange = (e) => {
      const {name , value} = e.target
      setSupplier({
            ...supplier ,
            [name] : value
      })

     checkAllAttributesFilled()

  }


  return (
    <>
      {contextHolder}
      <Button className='btn' onClick={showModal}>
        <h5> {optionName} </h5>
      </Button>


      <Modal 
            title="Add Supplier" 
            open={isModalOpen} 
            onCancel={handleCancel}
            footer = {[]}
      >
            <form onSubmit={handleOk}>
                  <div className='row'>
                        <div className='col-6'>
                              <input 
                                    type='email' 
                                    name = 'email'
                                    className='form-control' 
                                    placeholder='name@domain.com'
                                    onChange={handleChange}
                                    value={supplier.email}
                                    required
                                    />
                        </div>
                        <div className='col-6'>
                              <input 
                                    className='form-control' 
                                    placeholder='Mr.Thor'
                                    name = 'name'
                                    value={supplier.name}
                                    onChange={handleChange}
                                    required
                                    />
                        </div>
                  </div>

                  <input 
                        className='form-control mt-3' 
                        placeholder='Address'
                        name = 'address'
                        value={supplier.address}
                        onChange={handleChange}
                        required
                        />

                  <div className='row mt-3'>
                        <div className='col-6'>
                              <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder=' city '
                                    value={supplier.city}
                                    onChange={handleChange}
                                    name='city'
                                    required
                                    />
                        </div>
                        <div className='col-6'>
                              <input 
                                    className='form-control' 
                                    placeholder=' Contact Number '
                                    onChange={handleChange}
                                    value={supplier.phoneNumber}
                                    name='phoneNumber'
                                    required
                                    />
                        </div>
                  </div>

                  <div className='form-group d-flex'>

                        <input 
                              className='form-control mt-3' 
                              placeholder=' Description '
                              onChange={handleChange}
                              value={supplier.description}
                              name = 'description'
                              required
                        />

                  

                  </div>
                  
                  <button disabled = {isButtonDisable} className='btn bg-dark text-light w-25 mt-3'> {optionName == 'Edit' ? optionName : 'ADD'} </button>
            </form>
      </Modal>
      
    </>
  );
};

export default SupplierModel;
