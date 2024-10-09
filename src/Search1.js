import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import items from './ItemList'; // Import your items list
import './Search1.css'

export default function Search(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const { searchQuery } = location.state || ""; // Retrieve search query from the state

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())

  
  );

  

  function AddToCart(index) {
    const updatedCart = [...props.cart]; // Create a copy of the cart array
    const ItemToAdd = { ...items[index] }; // Create a copy of the item to add
  
    const foundInd = updatedCart.findIndex((cartItem) => {
      return cartItem.id === items[index].id;
    });
  
    if (foundInd !== -1) {
      // Update quantity without mutating the original state
      updatedCart[foundInd] = {
        ...updatedCart[foundInd],
        quantity: updatedCart[foundInd].quantity + 1
      };
      props.setCart(updatedCart);
    } else {
      // Set the initial quantity for new items
      ItemToAdd.quantity = 1;
      props.setCart([...updatedCart, ItemToAdd]);
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
              <button onClick={()=>{
                AddToCart(index)
              }}>Add To Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No items found matching your search criteria.</p>
      )}
    </div>
  );
  
}
