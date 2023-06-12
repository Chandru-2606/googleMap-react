import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useUsers } from '../../App'
import { v4 as uuidv4 } from 'uuid';



let initialState = {
    number:"",
    password:""
}
function Login() {
    const [loginUser, setLoginUser]=useState(initialState);
    const [error, setError]=useState({})
    const [loginData, setLoginData] = useState()
    const [inCorrect, setInCorrect] = useState({})
    let navigate = useNavigate()


    // Initially one customer data will be added to the Map 
    useEffect(()=>{
        let customersData ={
            customerName :"Chandru",
            customerNumber:9874561230,
             id:uuidv4(),
            customerLatitude:12.971389,
            customerLongitude :77.750130 
        }
        const received =localStorage.getItem("customersData")
            if(received ==null){
            localStorage.setItem("customersData", JSON.stringify([customersData]))
            }
        }, [])

    // Getting SignUp data from LocalStorage 
    useEffect(()=>{
        let a = JSON.parse(localStorage.getItem("signup"))
        setLoginData(a)
    },[])

    // Function to store inputs in State 
    const onchangehandler =(e)=>{
        let {name, value} = e.target;
        setLoginUser({...loginUser, [name]:value})
    }

    // Function to validate and Navigating 
    const handleSubmit =(e)=>{
        e.preventDefault();
        setError(validate(loginUser))
    }

    // Validate Function 
    let validate =(values)=>{
        let errors ={}
        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        const regexExp = /^[6-9]\d{9}$/
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
        return(errors)
    }

    // Verfying the Already Signed Up or not 
    const Onsubmit =()=>{
        loginData && loginData.map((item, index)=>{
            if(item.number == loginUser.number && item.password == loginUser.password){
                navigate(`/otp`);
            }else{
                let errors ={}
                errors.invalid="Number and Password not registered. Signup Please"
                setInCorrect(errors)
            }
        })
    }
    console.log(inCorrect);
  return (
    <div className='login-Container'>
        <form onSubmit={handleSubmit}>
            <h2>TrackXpress</h2>
            <span>New user Sigup</span>
            <hr/>

            <Input size="large" placeholder="Number" name="number" value={loginUser.number} onChange={(e)=>onchangehandler(e)}  prefix={<UserOutlined />}/><br/>
            <span className='login-error'>{error.number}</span>

            <Input.Password placeholder='Password' name='password'  value={loginUser.password} onChange={(e)=>onchangehandler(e)} /><br/>
            {error.password?<span className='login-error'>{error.password}</span> :
            <span className='login-error'>{inCorrect.invalid}</span>}
           
            <div className="sign_btn"> <p>Not a Member ?</p>
                <a  onClick={() => {navigate("/signup")}}>Sign Up</a>
            </div>
            <button className="login-btn" onClick={Onsubmit}>Get OTP</button>
        </form>
    </div>
  )
}

export default Login;
