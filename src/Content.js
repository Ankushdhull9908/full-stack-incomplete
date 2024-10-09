import React, { useState } from 'react';
import items from './ItemList';
import './Content.css';
import Hero1 from './Hero1.js';
import { useNavigate } from 'react-router-dom';



export default function Content(props) {
  const navigate = useNavigate();
  const [filterItems,setFilterItems] = useState(items)
  
  // Define the style based on the mode prop
  const modeStyle = {
    backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
  };


  function AddToCart(index) {
    const itemToAdd = items[index];

    
    const existingItem = props.cart.find((cartItem) => cartItem.id === itemToAdd.id);

    if (existingItem) {
      
      const updatedCart = props.cart.map((cartItem) =>
        cartItem.id === itemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      props.setCart(updatedCart);
    } else {
      // Item doesn't exist in the cart, add it with quantity: 1
      props.setCart([...props.cart, { ...itemToAdd, quantity: 1 }]);
    }
  }

  function phones(){
    let phones = items.filter(i => i.category === "phone");
   

    setFilterItems(phones)
  
  }

  function laptops(){
    var laptop = items.filter(i=> i.category === "laptop");
   

    setFilterItems(laptop)
  
  }
   
  function all(){
    setFilterItems(items)
  }

  function television(){
    var tv = items.filter((i)=> i.category==="tv")
    setFilterItems(tv)
  }
  

  

  

  return (
    <div className='main' style={modeStyle}>
      <Hero1 style={modeStyle}/>
      <div className='Categories'>
        <h1>Categories</h1>
        <img src="/asus.jpeg" onClick={()=>{
          all()
        }}  alt="error"/>
        <img src="/asus2.jpg" onClick={()=>{
          laptops()
        }} alt="error" />
        <img src="/s24.jpg" onClick={()=>{
          phones()
        }} alt="error" />
        <img src="/qled.jpeg" onClick={()=>{
          television()
        }} alt="error" />
      </div>
       
      <div className='MainContent' id="items" style={modeStyle}>
     
        {filterItems.map((item, index) => (
          <div key={item.id} className='item' style={modeStyle}>
            <img src={item.url} onClick={() => navigate(`/items/${item.id}`)} alt={item.id}/>
            <h1 onClick={() => navigate(`/items/${item.id}`)} >{item.name}</h1>
            <p><strong>Price:</strong> ₹{item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => AddToCart(index)}>Add to Cart</button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
