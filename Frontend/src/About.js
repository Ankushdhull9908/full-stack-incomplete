import React from 'react'
//import img1 from './public/react.jpg'
import './About.css'

export default function About(props) {
    const mystyle = {
        backgroundColor: props.mode==="dark" ? "white":"grey"
    }
  return (
    <div className="AboutPage" style={mystyle}>
      <img alt="helo" src="/react.jpg"/>
    </div>
  )
}
