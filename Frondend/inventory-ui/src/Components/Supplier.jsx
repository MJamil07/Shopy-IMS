import React, { useEffect, useState } from "react";
import "./Stylesheet/style.css";
import axios from "axios";
import SupplierModel from "./Models/SupplierModel";
import {
  ExclamationCircleFilled,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import { Modal, notification } from "antd";

export default function Supplier() {
  const [suppliersData, setSuppliersData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [reload, setReload] = useState(false);
  const [supplierActiveOrInActive, setSupplierActiveOrInActive] =
    useState("active");
  const [api, contextHolder] = notification.useNotification();
  
  useEffect(() => {

      let url = "https://shopy-ims-api.vercel.app/api/v1/supplier/";
     
      if (supplierActiveOrInActive === "active") {
        url += 'getActiveSupplier';
      } else {   
        url += 'getDisActiveSupplier'
      }
    
     console.log("url = " + url);
    
      axios.get(url).then((res) => {
        setSuppliersData(res.data);
      });
    
  }, [reload , supplierActiveOrInActive]);

  const search = () => {
    const url = searchByName.trim()
      ? `https://shopy-ims-api.vercel.app/api/v1/supplier/search?name=${searchByName.trim()}`
      : `https://shopy-ims-api.vercel.app/api/v1/supplier/show`;

    axios.get(url).then((res) => {
      setSuppliersData(res.data);
    });
  };

  const popUpNotification = (message, description, notifyStatus) => {
    notifyStatus({ message, description });
  };

  const changeSupplierActiveOrInActive = (status) => {
    if(supplierActiveOrInActive === status) return;
    setSupplierActiveOrInActive(status)
  }

  const handleCheckboxChange = (_id , status) => {
    

      Modal.confirm({
        title : 'Can you change this active ?' ,
        onOk : ()=> {
          
          let data = { _id , isActive : status === 'true' ? true : false}
          const description = status === 'true' ? 'Active' : 'In-Active'
          axios.post('https://shopy-ims-api.vercel.app/api/v1/supplier/updateSupplierActiveStatus' , data)
                .then(result => {
                    console.log(result);
                    setReload(!reload)
                    popUpNotification(
                      "Active Status",
                      "Successfully Changed " + description,
                      api.success
                    );
                })
                .catch(error => {
                  popUpNotification(
                    "Active Status",
                    " Did'not  Changed..! ",
                    api.error
                  );
                })
        }

      })

      
  }

  const deleteBySupplier = (id) => {
    Modal.confirm({
      title: "Do you Want to delete these Supplier .?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        axios
          .delete(`https://shopy-ims-api.vercel.app/api/v1/supplier/delete/${id}`)
          .then((res) => {
            setReload(!reload);
            popUpNotification(
              "Deleted Status",
              "Successfully Deleted",
              api.success
            );
          })
          .catch((err) => {
            api.error({
              message: "Deleted Status",
              description: err.response.data,
            });
          });
      },
    });
  };

  return (
    <div className="container">
      {contextHolder}
      {/* Search Components Start */}
      <div className="row">
        <div className="search d-flex col-6">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearchByName(e.target.value)}
            placeholder="Search the Name......"
          />
          <button onClick={search} className="btn ms-3 btn-primary">
            Search
          </button>
        </div>
        <div className="col-4"></div>
        <div className="col-2">
          <SupplierModel
            reload={reload}
            setReload={setReload}
            optionName={" + Add Supplier "}
            name={""}
            email={""}
            address={""}
            city={""}
            phoneNumber={""}
            description={""}
          />
        </div>
      </div>
      {/* Search Components End */}

      <div className="active-status-chooser d-flex mt-3 ">
        <button 
            className="btn"
            onClick={()=> {
                changeSupplierActiveOrInActive("active")
            }}

            style={
              supplierActiveOrInActive === 'active' ?
              {
                background : 'green' ,
                color : 'white'
              } : {
                color : 'green'
              }
            }
        >
          <li> Active </li>
        </button>
        <button 
            className="ms-2 btn"
            onClick={()=> {
             changeSupplierActiveOrInActive("inActive")
          }}
          style={
            supplierActiveOrInActive === 'inActive' ?
            {
              background : 'red' ,
              color : 'white'
            } : {
              color : 'red'
            }
          }
          >
          <li> In-Active </li>
        </button>
      </div>

      {/* Table for data */}
      <div className="table-info">
        <table className="table ">
          <caption>
            List the all Suppliers : {suppliersData &&
              suppliersData.length}
          </caption>
          <thead className="thead" style={{ color: "gray" }}>
            <tr>
              <th scope="col">N.of</th>
              <th scope="col"> Active </th>
              <th style={{color : 'teal'}} scope="col">Name</th>
              <th style={{color : 'tomato'}} scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th className='text-primary' scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {suppliersData &&
              suppliersData.map((supplier, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> 
                        <div className="drop-down-active select">
                            <select onChange={(e)=> handleCheckboxChange(supplier._id , e.target.value )}>
                                <option 
                                    selected = {supplierActiveOrInActive === 'active' ? true : false} 
                                    value={true}> Active </option>
                                <option
                                    selected = {supplierActiveOrInActive === 'inActive' ? true : false}
                                    value={false}> In-Active </option>
                            </select>
                        </div> 
                    </td>
                    <td style={{color : 'teal'}}> {supplier.name} </td>
                    <td style={{color : 'tomato'}}> {supplier.email} </td>
                    <td> {supplier.address} </td>
                    <td>  {supplier.city} </td>
                    <td className='text-primary'> {supplier.phoneNumber} </td>
                    <td>
                      <button
                        onClick={() => deleteBySupplier(supplier._id)}
                        className="btn btn-outline-danger"
                      >
                        {" "}
                        <DeleteFilled />{" "}
                      </button>{" "}
                    </td>

                    <td>
                      <EditFilled />
                      <SupplierModel
                        reload={reload}
                        setReload={setReload}
                        optionName={"Edit"}
                        name={supplier.name}
                        email={supplier.email}
                        address={supplier.address}
                        city={supplier.city}
                        phoneNumber={supplier.phoneNumber}
                        description={supplier.description}
                        id={supplier._id}
                      />
                    </td>
                  </tr>
                );
              })}

            {!suppliersData && <h2> Data is Not Found </h2>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
