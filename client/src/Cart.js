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
    
    /*const updatedCart = [...props.cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); // Remove the item if quantity is 1
    }
    props.setCart(updatedCart);*/
    try{
      const minsQuantity = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

      fetch('http://localhost:7600/minsCartQuantity',{
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
    
   /* const updatedCart = [...props.cart];
    updatedCart[index].quantity += 1;
    props.setCart(updatedCart);*/
    try{
      const plusQuantity = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

      fetch('http://localhost:7600/plusCartQuantity',{
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

  

  // Function to remove an item from the cart
  function removeFromCart(index) {

    
    /*const updatedCart = [...props.cart];
    updatedCart.splice(index, 1);
    props.setCart(updatedCart);*/

    try{
       const datatodelete = {itemId:props.cart[index].itemId,itemOwnerEmail:udata.user.name}

       fetch('http://localhost:7600/deletcartitem',{
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
      {props.cart.length === 0 ? (
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
      )}
    </div>
  );
}
