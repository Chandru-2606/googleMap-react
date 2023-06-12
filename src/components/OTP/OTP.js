import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useUsers } from '../../App'
import { Input } from 'antd';
import './OTP.css'


let initialState ={
    otp:"",
}
function Otp() {

    const [otpVerify, setOptVerify] = useState(initialState)
    const [error, setError] = useState({})
    const [customersData, setCustomersData] = useState()
    const [latitude, setLatitude] = useState('')
    let navigate = useNavigate()
    let { id } = useParams();

    // Verfying Location is Turned on or off 
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude )
        })
    },[])

    
    // console.log(id);
    useEffect(()=>{
    let localrecived = JSON.parse(localStorage.getItem("customersData"))
    setCustomersData(localrecived)
    },[])

    // Storing values in State 
    const onchangehandler =(e)=>{
        let {name, value} = e.target;
        setOptVerify({...otpVerify, [name]:value})
    }

    // OTP verfying 
    const handleSubmit =(e)=>{
        e.preventDefault();
        setError(validate(otpVerify))
        customersData &&customersData.map((item)=>{
        if(otpVerify.otp == 12345){
            if(latitude !== ''){
            return navigate((`/dashboard/${item.id}/${item.customerLatitude}/${item.customerLongitude}`))
            }else{
                alert('Give acces to the location and Reload pls')
            }
        }else{
            let errors={}
            errors.wrongOtp="Enter OTP as 12345"
            setError(errors)
        }
    })
    }

    // Validating 
    const validate =(values)=>{
        let errors ={}
        if(!values.otp){
            errors.otp=" Enter the OTP"
        }
        else if (isNaN(values.otp)){
            errors.otp="OTP must be Numbers"
        }
        return (errors)
    }


  return (
    <div className='otp-container'>
      <form onSubmit={handleSubmit}>
        <h2>OTP Verification</h2>
        <Input name='otp' placeholder='Enter OTP' value={otpVerify.otp} onChange={(e)=>onchangehandler(e)}/><br/>
        <span className='otp-error'>{error.otp}</span><br/>
        <span className='otp-error'>{error.wrongOtp}</span><br/>
        <button >Get Verified</button>
      </form>
    </div>
  )
}

export default Otp
