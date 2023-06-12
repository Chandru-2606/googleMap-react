import React, { useEffect, useState, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../App';
import './dashboard.css'
const containerStyle = {
  width: '100%',
  height: '90%',
}



function Dashboard() {
  const { users , dispatch } = useUsers()

  // center Latitude and Logitude 
  let latLang = {
    lat :users.originLat,
    lng:users.originLng
  }

  // state.
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [latitude, setLatitude] = useState(latLang)
  const [position, setPosition] = useState(10)
  let navigate = useNavigate()

  

    // Getting latitude and Longitude by Params
    let { id} = useParams();
    let {lat} = useParams();
    let {lng} = useParams();


    // storing destination latitude and longitude in Reducer
    useEffect(()=>{
    dispatch({type: 'destinationLat', post : lat})
    dispatch({type:'destinationLng', post: lng})
  },[])



      useEffect(()=>{
        setInterval(() => { 
        navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude({...latitude, lat:position.coords.latitude, lng:position.coords.longitude})
        dispatch({type:'originLat', post :position.coords.latitude})
        dispatch({type : 'originLng' , post:position.coords.longitude})
        })
      },5000)
    },[])


  // Googole APi 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCNIB_JhoVXLYgHG4dWi5IBSAt2pwgXJZ0",
    libraries:['places']
  })

  // Function to Calculate the route 
  async function calculateRoute (){
    setPosition(20)
      /* eslint-disable-next-line no-undef */
      const directionService = new google.maps.DirectionsService()
      const results = await directionService.route({
      origin: new window.google.maps.LatLng(users.originLat, users.originLng),
      destination: new window.google.maps.LatLng(users.destinationLat, users.destinationLng),
      /* eslint-disable-next-line no-undef */
      travelMode:google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

 

  return isLoaded ? (
    <div className='dashboard-container'>
      <div className='navContainer'>
        <div className='dashboard-btns'>
          <span>It will take 5 sec to load and then Click on Calculate Route</span>
          <button onClick={calculateRoute}>Calculate Route</button>
        </div>
        <div className='distance'>
          <h3>Distance : <span>{distance}</span></h3>
          <h3>Duration : <span>{duration}</span></h3>
        </div>
          <button className='addCus' onClick={() => {navigate(`/customer`)}}>Add Customer</button>
      </div>

    <GoogleMap mapContainerStyle={containerStyle} center={latitude} zoom={15} onLoad={(map)=>setMap(map)}>
        <Marker position={latitude} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
    </div>
  ) : <> Loading . . .</>
}

export default Dashboard
