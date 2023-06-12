import React, { useState } from 'react'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './addCustomer.css'


let initialState ={
    customerName:"",
    customerNumber:"",
    id:uuidv4(),
    customerLatitude :"",
    customerLongitude:""
}
function AddCustomer() {
    const [addCustomer, setAddCustomer] = useState(initialState)
    const [error, setError] = useState({})
    let navigate = useNavigate()

    // Regex to validate Number, Latitude and Longitude 
    const regexExp = /^[6-9]\d{9}$/
    const latituderegex =/^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/
    const longituderegex =/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/

    // Storing input values to State 
    const onchangehandler=(e)=>{
        let {name, value} = e.target;
        if(name === "latitude"){
            value = value.split(" ").join("")
            setAddCustomer({...addCustomer, [name]: value})
           }
        if(name === "longitude"){
            value = value.split(" ").join("")
            setAddCustomer({...addCustomer, [name]: value})
        }
        setAddCustomer({...addCustomer, [name]:value})
    }
    
    // Storing NewCustomer to localStorage 
    const handleSubmit =(e)=>{
        e.preventDefault();
        setError(validate(addCustomer))
        const expensereceived=localStorage.getItem("customersData")


        if(addCustomer.customerName !==  "" &&
           addCustomer.customerNumber !== "" &&
           addCustomer.customerLatitude !== "" &&
           latituderegex.test(addCustomer.customerLatitude) &&
           longituderegex.test(addCustomer.customerLongitude) &&
           addCustomer.customerLongitude !== ""){

            let arr=JSON.parse(expensereceived);
            arr.push(addCustomer)
            console.log(arr);
            localStorage.setItem("customersData",JSON.stringify(arr));
           navigate('/customer')
           }
    }

    // Validating inpute values 
    function validate (values){
        let errors ={}
        if(!values.customerName){
            errors.customerName=" Name is required" 
        }else if(values.customerName.length <5){
            errors.customerName="length need to be greter than 5"
        }

        if(!values.customerNumber ){
            errors.customerNumber=" Number is required"
        }else if (isNaN(values.customerNumber)){
            errors.customerNumber="Enter Only Number"
        }else if(values.customerNumber.length !==10){
            errors.customerNumber="Enter 10 digits"
        }
        else if (!regexExp.test(values.customerNumber)){
            errors.customerNumber="This number is not Valid number"
        }

        if(!values.customerLatitude ){
            errors.customerLatitude=" Latitude is required"
        }else if (isNaN(values.customerLatitude)){
            errors.customerLatitude="Enter Only Number"
        }else if (!latituderegex.test(values.customerLatitude)){
            errors.customerLatitude="This number is not Valid latitude"
        }

        if(!values.customerLongitude ){
            errors.customerLongitude=" longitude is required"
        }else if (isNaN(values.customerLongitude)){
            errors.customerLongitude="Enter Only Number"
        }else if (!longituderegex.test(values.customerLongitude)){
            errors.customerLongitude="This number is not Valid longitude"
        }

        return errors
    }

    
  return (
    <div className='addCustomer-dashboard'>
        <form onSubmit={handleSubmit}>
            <p>Create Customer</p>
            <span className='error-addcustomer'>Please Enter Correct Latitude and logitude</span>
            <Input name='customerName' placeholder='Enter Customer Name' value={addCustomer.name} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />} /><br/>
            <span className='error-addcustomer'>{error.customerName}</span><br/>
            <Input name='customerLatitude' placeholder='Enter Customer latitude' value={addCustomer.latitude} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />} /><br/>
            <span className='error-addcustomer'>{error.customerLatitude}</span><br/>
            <Input name='customerLongitude' placeholder='Enter Customer longitude' value={addCustomer.longitude} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />} /><br/>
            <span className='error-addcustomer'>{error.customerLongitude}</span><br/>
            <Input name='customerNumber' placeholder='Enter Customer Number' value={addCustomer.phone} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />} /><br/>
            <span className='error-addcustomer'>{error.customerNumber}</span><br/>
            <button >Add</button>
        </form>
    </div>
  )
}

export default AddCustomer