import React from 'react';
import { useParams } from 'react-router-dom';
import items from './ItemList';
import './DescriptionOfItems.css'; // Import the CSS file


export default function DescriptionOfItems(props) {
  const modeStyle = {
    backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
  };
  
  const { id } = useParams();
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <h2>Item not found</h2>;
  }

  const handleAddToCart = () => {
    let CopyOfCart = [...props.cart]; // Create a copy of the cart
    let ExistingItemIndex = CopyOfCart.findIndex((Cartitem) => {
        return Cartitem.id === item.id; // Check for the item's existence
    });

    if (ExistingItemIndex !== -1) { // Check if item exists
        CopyOfCart[ExistingItemIndex].quantity += 1; // Increase quantity
        props.setCart(CopyOfCart); // Update the cart state
    } else {
        const newItem = { ...item, quantity: 1 }; // Start quantity at 1
        props.setCart([...CopyOfCart, newItem]); // Add new item to cart
    }
};


  return (
    <div className="container" style={modeStyle}>
      
      <img src={item.Bigimage} alt={item.name} className="item-image" />
      <div className="item-details">
        <h1 className="item-title">{item.name}</h1>
        <p className="item-price"><strong>Price:</strong> ₹{item.price}</p>
        <p className="item-description">{item.description}</p>
        <button className="add-to-cart" onClick={()=>{
          handleAddToCart()
        }}>
          Add to Cart
        </button>

        {item.specifications && (
          <div className="specifications">
            <h2>Specifications</h2>
            <table className="specifications-table">
              <tbody>
                {Object.entries(item.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase()+ key.slice(1)}:</td>
                    <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


