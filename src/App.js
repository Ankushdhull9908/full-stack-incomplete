import React, { useState } from 'react';
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
import Contact from './Contact.js';
import Cart from './Cart.js';

import Search1 from './Search1.js';
import DescriptionOfItems from './DescriptionOfItems.js';






function App() {
  const [modestyle, newmodestyle] = useState("dark");
  const [btnValue, setBtnValue] = useState("Dark Mode");
  const [cart,setCart] = useState([])
  const [text, setText] = useState('');
 

  

  const toggleMode = () => {
    if (modestyle === "dark") {
      newmodestyle('light');
      setBtnValue("Light Mode");
    } else {
      newmodestyle('dark');
      setBtnValue("Dark Mode");
    }
  }

  
  console.log(cart)


  return (
    <>
      <div className='firstParent'>
      <BrowserRouter>
        <NavBar title="elecTRONic" Home="Home" mode={modestyle} toggle={toggleMode} value={btnValue}  text={text} setText={setText}/>
        <Routes>
          <Route path="/about" element={<About mode={modestyle}/>} />
          <Route path="/" element={<Content mode={modestyle} cart={cart} setCart={setCart} text={text} />} />
          <Route path="/contact" element={<Contact mode={modestyle} />} />
          <Route path="/news" element={<News mode={modestyle} />} />
          <Route path="/cart" element={<Cart mode={modestyle}  cart={cart} setCart={setCart}/>} />
          <Route path="/Search" element={<Search1 mode={modestyle} cart={cart} setCart={setCart}/>}/>
          <Route path="/items/:id" element={<DescriptionOfItems cart={cart} setCart={setCart} mode={modestyle}/>} />
          
        </Routes>
        
         {/*<Footer about="About Me" mode={modestyle} />*/}
      </BrowserRouter>
      
      </div>
    </>
  );
}

export default App;
