import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './signup.css'


const initialState ={
    name:"",
    email:"",
    number:"",
    password:"",
    cpassword:"",
    id:uuidv4()
}

function Signup() {
    const [signupData, setSignupData] = useState(initialState)
    const [error, setError]=useState({})
    let navigate = useNavigate()

    // Regex to validate Email and Number 
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    const regexExp = /^[6-9]\d{9}$/


    // Storing the value in State 
    const onchangehandler =(e)=>{
        let {name, value} = e.target;
        setSignupData({...signupData, [name]:value})
    }

    // Function to Store Data in LocalStorage 
    const handleSubmit =(e)=>{
        e.preventDefault();
        setError(validate(signupData))

    const datareceived=localStorage.getItem("signup")
        if(signupData.name !== "" &&  
           signupData.email !== "" && 
           signupData.number !== "" && 
           signupData.password !== "" &&
           signupData.cpassword !== ""  &&
           regexExp.test(signupData.number) &&
           signupData.password == signupData.cpassword){
               
            if(datareceived == null){
                localStorage.setItem("signup",JSON.stringify([signupData]))
            }else{
                let arr=JSON.parse(datareceived);
                console.log(arr)
                arr.push(signupData)
                localStorage.setItem("signup",JSON.stringify(arr));
            }
            navigate("/")
        }
    }

    // validating the inputs 
    const validate =(values)=>{
        let errors ={}
        if(!values.name){
            errors.name="Name is required" 
        }else if(values.name.length <5){
            errors.name="length need to be greter than 5"
        }

        if(!values.email){
            errors.email=" Email is required"
        }else if (!emailRegex.test(values.email)){
            errors.email="This email is not Valid email"
        }

        if(!values.number ){
            errors.number=" Number is required"
        }else if (isNaN(values.number)){
            errors.number="Enter Only Number"
        }else if(values.number.length !==10){
            errors.number="Enter 10 digits"
        }
        else if (!regexExp.test(values.number)){
            errors.number="This number is not Valid number"
        }

        if(!values.password){
            errors.password=" Password is required" 
        }else if(values.password.length <5){
            errors.password="length need to be greter than 5"
        }

        if(!values.cpassword){
            errors.cpassword="Confirm password is required" 
        }else if(values.cpassword.length <5){
            errors.cpassword="length need to be greter than 5"
        }
        if(values.password !== values.cpassword){
            errors.samePassword ="Password and Confirm Must be same"
        }
        return (errors)
    }

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <Input name='name' placeholder='Name' value={signupData.name} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />} /><br/>
        <span className='signup-error'>{error.name}</span>

        <Input name='email' placeholder='Email' value={signupData.email} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />}/><br/>
        <span className='signup-error'>{error.email}</span>

        <Input name='number' placeholder='Number' value={signupData.number} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />}/><br/>
        <span className='signup-error'>{error.number}</span>

        <Input name='password' placeholder='Password' value={signupData.password} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />}/><br/>
        <span className='signup-error'>{error.password}</span>

        <Input name='cpassword' placeholder='Comfirm Password'value={signupData.cpassword} onChange={(e)=>onchangehandler(e)} prefix={<UserOutlined />}/><br/>
        <span className='signup-error'>{error.cpassword}</span><br/>
        <span className='signup-error'>{error.samePassword}</span><br/>
        
        <button className='signup-btn'>Signup</button>
      </form>
    </div>
  )
}

export default Signup
