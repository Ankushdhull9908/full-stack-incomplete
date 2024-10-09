import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(props) {
  const navigate = useNavigate(); // React Router hook for navigation

  // Define styles based on the mode prop
  const mystyle = {
    backgroundColor: props.mode === "dark" ? "aliceblue" : "black",
    color: props.mode === "dark" ? "black" : "white",
  };

  
  function changeText(e) {
    var val = e.target.value;
    props.setText(val);
  }

  // Function to handle search button click and navigate to the Search page
  function display() {
    navigate('/search', { state: { searchQuery: props.text } });
  }

  return (
    <div>
      <div className="navigation" style={mystyle}>
        <div className='logo'>
          <p>{props.title}</p>
        </div>
        <div className="inside-nav">
          <Link to="/" className="link" style={{ color: mystyle.color }}>
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

        {/* Input field to capture the text */}
        <div className="search-area">
          <input
            type="text"
            id="search"
            placeholder="search"
            value={props.text} // Bind the input value to state
            onChange={changeText} // Call changeText when value changes
          />
          <button className='searchBtn' onClick={display}>Search</button>
        </div>

        <Link to="/cart" className="link" style={{ color: mystyle.color }}>
          <p>Cart</p>
        </Link>

        <div className="dark-light-mode">
          <button className='darkbtn' onClick={props.toggle}>{props.value}</button>
        </div>
      </div>
    </div>
  );
}
