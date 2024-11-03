import React, { useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

export default function Cart(props) {
  const navigate = useNavigate();

  const userdata = localStorage.getItem("userdata");
  const udata = JSON.parse(userdata);


  useEffect(()=>{
      
      const displayCart = async ()=>{
        try{
             const response = await fetch("https://full-stack-incomplete.onrender.com/displaycart")
             const data = await response.json();
             
               
              const FilteredCart = data.filter((item)=>{
                return item.itemOwnerEmail === udata.user.name;
              })
              props.setCart(FilteredCart)
              
        }catch(error){
          console.log(error)
        }
  }
  displayCart()
    
      
  },[props.cart],[plusQuantity],[minsQuantity])

  // Calculate total cart price by summing up each item's price * quantity
  const totalCartPrice = props.cart.reduce((accum, item) => accum + item.itemPrice * item.itemQuantity, 0);

  // Function to decrease the quantity of an item or remove it if quantity is 1
  function minsQuantity(index) {
    

    try{
      const minsQuantity = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

      fetch('https://full-stack-incomplete.onrender.com/minsCartQuantity',{
       method:"Post",
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify(minsQuantity)
       
      })
      console.log(minsQuantity)

      
   }catch(error){
    console.log(error)
   }
  }

  // Function to increase the quantity of an item
  function plusQuantity(index) {
    
   
    try{
      const plusQuantity = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

      fetch('https://full-stack-incomplete.onrender.com/plusCartQuantity',{
       method:"Post",
       headers:{
         'Content-Type':'application/json'
       },
       body:JSON.stringify(plusQuantity)
       
      })
      console.log(plusQuantity)

      
   }catch(error){
    console.log(error)
   }
  }

  

  function removeFromCart(index) {

    try{
       const datatodelete = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

       fetch('https://full-stack-incomplete.onrender.com/deletcartitem',{
        method:"Post",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(datatodelete)
       })
       

       
    }catch(error){

    }
  }

  return (
    <div className='Cart'>
      {
        !udata ? (<><p>You're not logged in ....Login First</p>
        <img src='/penguin.jpg' id='penguin'/></>) : (
          props.cart.length === 0 ? (
            <p>CART EMPTY</p>
          ) : (
            <div>
              {props.cart.map((item, index) => (
                <div key={item.itemId} className='item2'>
                  <img src={item.itemUrl} onClick={() => navigate(`/items/${item.itemId}`)} alt='hi' />
                  <h1>{item.itemName}</h1>
                  <p><strong>Price:</strong> ₹{item.itemPrice}</p>
                  <p>{item.itemDescription}</p>
                  <p><strong>Quantity:</strong> {item.itemQuantity}</p>
                  <p><strong>Total Price:</strong> ₹{item.itemQuantity * item.itemPrice}</p>
                  <button id="first" onClick={() => minsQuantity(index)}> - </button>
                  <button id="second" onClick={() => plusQuantity(index)}> + </button>
                  <button id="remove" onClick={() => removeFromCart(index)}>Remove From Cart</button>
                </div>
              ))}
              {/* Display total price */}
              <div className='cart-total'>
                <h2>Total Cart Price: ₹{totalCartPrice}</h2>
              </div>
            </div>
          )
        )
      }
    </div>
  );
}
