import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './customer.css'

function Customer() {

  const [customerDetails, setCustomersData] = useState()
  let navigate = useNavigate() 
  
  // Taking customer Details from localStorage 
  useEffect(()=>{
      let localrecived = JSON.parse(localStorage.getItem("customersData"))
      setCustomersData(localrecived)
    },[])

  // sendng Latitude and Longitude Details by Params 
  const goToMap =(values)=>{
    navigate((`/dashboard/${values.id}/${values.customerLatitude}/${values.customerLongitude}`))
  }
  return (
    <div className='customerDashboard'>
        <div className='header-customer'>
            <h1>TrackXpress</h1>
            <div className='header-btns'>
                <button onClick={() => {navigate(`/addCustomer`)}}>Add Customer</button>
                <button onClick={() => {navigate("/") } }>Logout</button>
            </div>
        </div>
        
        <div className='table-container'>
          <table >
            <tr>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Customer Latitude</th>
              <th>Customer Logitude</th>
              <th>Action</th>
            </tr>
                  
            {customerDetails && customerDetails.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.customerName}</td>
                  <td>{item.customerNumber}</td>
                  <td>{item.customerLatitude}</td>
                  <td>{item.customerLongitude}</td>
                  <td><button onClick={()=> goToMap(item)}>Go to Map</button></td>
                </tr>
                )
            })}
          </table>
        </div>
    </div>
  )
}

export default Customer
