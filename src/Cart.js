import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

export default function Cart(props) {
  const navigate = useNavigate();

  // Calculate total cart price by summing up each item's price * quantity
  const totalCartPrice = props.cart.reduce((accum, item) => accum + item.price * item.quantity, 0);

  // Function to decrease the quantity of an item or remove it if quantity is 1
  function minsQuantity(index) {
    const updatedCart = [...props.cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); // Remove the item if quantity is 1
    }
    props.setCart(updatedCart);
  }

  // Function to increase the quantity of an item
  function plusQuantity(index) {
    const updatedCart = [...props.cart];
    updatedCart[index].quantity += 1;
    props.setCart(updatedCart);
  }

  // Function to remove an item from the cart
  function removeFromCart(index) {
    const updatedCart = [...props.cart];
    updatedCart.splice(index, 1);
    props.setCart(updatedCart);
  }

  return (
    <div className='Cart'>
      {props.cart.length === 0 ? (
        <p>CART EMPTY</p>
      ) : (
        <div>
          {props.cart.map((item, index) => (
            <div key={item.id} className='item2'>
              <img src={item.url} onClick={() => navigate(`/items/${item.id}`)} alt='hi' />
              <h1>{item.name}</h1>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p>{item.description}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Total Price:</strong> ₹{item.quantity * item.price}</p>
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
