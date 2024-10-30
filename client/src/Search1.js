import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
//import items from './ItemList'; // Import your items list
import './Search1.css'

export default function Search(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const { searchQuery } = location.state || ""; 

 
  const filteredItems = props.allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    
  
  );
  

  
  function AddToCart(index) {
    const updatedCart = [...props.cart];
    const itemToAdd = { ...filteredItems[index] }; 
  
    
    const foundInd = updatedCart.findIndex((cartItem) => {
      return cartItem.id === itemToAdd.id; 
    });
  
    if (foundInd !== -1) {
      
      updatedCart[foundInd] = {
        ...updatedCart[foundInd],
        quantity: updatedCart[foundInd].quantity + 1 
      };
      props.setCart(updatedCart);
    } else {
      
      itemToAdd.quantity = 1;
      props.setCart([...updatedCart, itemToAdd]); 
    }
  }
  
  return (
    <div className="search-container">
      <h2>Search Results for: "{searchQuery}"</h2>
      {filteredItems.length > 0 ? (
        <div className="results">
          {filteredItems.map((item, index) => (
            
            <div key={item.id} className="item-card">
              
              <img src={item.url} alt={item.name}  onClick={() => navigate(`/items/${item.id}`)}/>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ₹{item.price}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No items found matching your search criteria.</p>
      )}
    </div>
  );
  
}
