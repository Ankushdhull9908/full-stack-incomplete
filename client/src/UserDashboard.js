import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';

import './userdashboard.css';




export default function UserDashboard(props) {
    const {id} = useParams()
    const navigate= useNavigate()
    const token = localStorage.getItem("userdata")
    

    if(!token){
        navigate("/")
    }
   
  return (
    <div className='userdash'>
      <p>This iS USER DASHBOARD oF {id}</p>
      <button id="logoutbtn" onClick={()=>{
        localStorage.removeItem("userdata")
        props.setsignupbtn("Sign Up")
        navigate("/")
      }}>Log out</button>
    </div>
  )
}
