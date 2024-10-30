import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {

 
  const navigate = useNavigate(); // React Router hook for navigation
  const [isNavOpen, setIsNavOpen] = useState(false); // State for menu toggle

  
  const token = localStorage.getItem("userdata")
    const userdata = JSON.parse(token)
  
  
 
  
  

  function checkToken(){
    
   if(!token){
    navigate("/form")
   
   }else{
    navigate(`/dashboard/:${userdata.user.name}`)
   }
  }

  // Define styles based on the mode prop
  const mystyle = {
    backgroundColor: props.mode === "dark" ? "aliceblue" : "black",
    color: props.mode === "dark" ? "black" : "white",
  };

  function changeText(e) {
    var val = e.target.value;
    props.setText(val);
  }

  function display() {
    navigate('/search', { state: { searchQuery: props.text } });
  }

  return (
    <div>
      <div className="navigation" style={mystyle}>
        <div className='logo'>
          <p>{props.title}</p>
        </div>

        {/* Hamburger menu for mobile screens */}
        <div className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
          ☰ {/* Simple menu icon */}
        </div>

        {/* Links section */}
        <div className={`inside-nav ${isNavOpen ? 'active' : ''}`}>
          <Link to="/api/items" className="link" style={{ color: mystyle.color }}>
            <p>Home</p>
          </Link>
          <Link to="/about" className="link" style={{ color: mystyle.color }}>
            <p>About Us</p>
          </Link>
          <Link to="/contact" className="link" style={{ color: mystyle.color }}>
            <p>Contact Us</p>
          </Link>
          <Link to="/news" className="link" style={{ color: mystyle.color }}>
            <p>NewsBar</p>
          </Link>
        </div>

        {/* Search area */}
        <div className="search-area">
          <input
            type="text"
            id="search"
            placeholder="search"
            value={props.text}
            onChange={changeText}
          />
          <button className='searchBtn' onClick={display}>Search</button>
        </div>


        {/* Cart link */}
        <Link to="/cart" className="link" style={{ color: mystyle.color }}>
        <div className='cart'>
        <img src='/shopping.png' alt='shop' id='cartImg'/>
          <p id="cartcount">{props.cartlength}</p>
          </div>
        </Link>
        <div className='signupbtn'>
        <button onClick={()=>{checkToken()}}>{props.signupbtn}</button>
        </div>
        

        {/* Mode toggle button */}
        
      </div>
    </div>
  );
}
