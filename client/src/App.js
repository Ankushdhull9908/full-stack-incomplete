import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './Content.js';
//import Footer from './Footer.js';
import NavBar from './NavBar.js';
import News from './NewsContent.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './About.js';

import Cart from './Cart.js';

import Search1 from './Search1.js';
import DescriptionOfItems from './DescriptionOfItems.js';
import Form from './Form.js';
import UserDashboard from './UserDashboard.js';
import QueryForm from './QueryForm.js';








function App() {
  const [cartCount,setCartCount] = useState(0)
  const [allItems, setAllItems] = useState([]); 
  const [modestyle, newmodestyle] = useState("dark");
  const [btnValue, setBtnValue] = useState("Dark Mode");
  const [cart,setCart] = useState([])
  const [text, setText] = useState('');

  
 

  

  const toggleMode = () => {
    if (modestyle === "dark") {
      newmodestyle('light');
     
    } else {
      newmodestyle('dark');
  
    }
  }

  const token = localStorage.getItem("userdata")

  const username = JSON.parse(token)

  const [signupbtn,setsignupbtn] = useState("Sign Up")

  window.onload=function(){
    setsignupbtn(!token?"Sign Up":`Hello ${username.user.name}`)
  }
  const cartLength = cart.length

 

  
  
  

 

  

  
  


  return (
    <>
      <div className='firstParent'>
      <BrowserRouter>
        <NavBar title="elecTRONic" Home="Home" mode={modestyle} toggle={toggleMode} value={btnValue}  text={text} setText={setText} signupbtn={signupbtn} setsignupbtn={setsignupbtn} cartlength={cartLength}/>
        <Routes>
          <Route path="/about" element={<About mode={modestyle}/>} />
          <Route path="/" element={<Content mode={modestyle} cart={cart} setCart={setCart} text={text} allItems={allItems} setAllItems={setAllItems} />} />
          <Route path="/contact" element={<QueryForm mode={modestyle} />} />
          <Route path="/news" element={<News mode={modestyle} />} />
          <Route path="/cart" element={<Cart mode={modestyle}  cart={cart} setCart={setCart} />} />
          <Route path="/Search" element={<Search1 mode={modestyle} cart={cart} setCart={setCart} allItems={allItems} />}/>
          <Route path="/items/:id" element={<DescriptionOfItems cart={cart} setCart={setCart} mode={modestyle} allItems={allItems} setAllItems={setAllItems}/>} />
          <Route path='/form' element = {<Form setsignupbtn={setsignupbtn}/>} />
          <Route path='/dashboard/:id' element={<UserDashboard  setsignupbtn={setsignupbtn}/>}/>
          
        </Routes>
        
         {/*<Footer about="About Me" mode={modestyle} />*/}
      </BrowserRouter>
      
      </div>
    </>
  );
}

export default App;
