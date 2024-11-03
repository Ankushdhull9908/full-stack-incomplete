import React from 'react'
import './Footer.css'

export default function Footer(props) {
  const mystle = {
    backgroundColor : props.mode==="dark" ? 'aliceblue' : 'white'
  }

  
  return (
    
    <div className='footer'>
      <div className="insideFooter">
        <p>Follow us</p>
        <p>{props.about}</p>
        <p>CopyRight © Ankush Dhull</p>
      </div>
    </div>

  )
}
