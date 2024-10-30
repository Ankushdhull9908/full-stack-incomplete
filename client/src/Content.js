import React, { useState, useEffect } from 'react';
import './Content.css';
import Hero1 from './Hero1.js';
import { useNavigate } from 'react-router-dom';

export default function Content(props) {
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [alldata,setAlldata] = useState([])
    const navigate = useNavigate();
    const [filterItems, setFilterItems] = useState([]);
    const token = localStorage.getItem("userdata");
    const username = token ? JSON.parse(token) : null;

    const modeStyle = {
        backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
    };

    const fetchItems = async () => {
        try {
            const response = await fetch('https://full-stack-incomplete.onrender.com/api/items'); 
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data);
            setAlldata(data)
            props.setAllItems(data); 
            setFilterItems(data); 
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems(); 
    }, []);

    function AddToCart(index) {
        if (!username) {
            alert("please login first");
            navigate("/form");
        } else {
            const itemData = {
                itemId: filterItems[index].id,
                itemUrl: filterItems[index].url,
                itemDescription: filterItems[index].description,
                itemName: filterItems[index].name,
                itemQuantity: parseInt(filterItems[index].quantity),
                itemPrice: filterItems[index].price,
                itemOwnerEmail: username.user.name
            };
            console.log(itemData);

            try {
                const res = fetch("https://full-stack-incomplete.onrender.com/api/addToCart", {
                    method: "POST",  // Ensure the method is POST
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemData)
                }); // Semicolon added here

            } catch (error) {
                console.log(error);
            }
        }
    }

    function phones() {
        setSelectedCategory("phone");
        const filteredPhones = props.alldata.filter(i => i.category === "phone");
        setFilterItems(filteredPhones);
    }

    function laptops() {
        setSelectedCategory("laptop");
        const filteredLaptops = props.alldata.filter(i => i.category === "laptop");
        setFilterItems(filteredLaptops);
    }

    function all() {
        setSelectedCategory("all");
        setFilterItems(props.allItems); 
    }

    function television() {
        setSelectedCategory("tv");
        const filteredTVs = props.alldata.filter(i => i.category === "tv");
        setFilterItems(filteredTVs);
    }

    return (
        <div className='main' style={modeStyle}>
            <Hero1 />
            <div className='Categories'>
                <h1>Categories</h1>
                
                <img
                    className={selectedCategory === "all" ? "active" : ""}
                    src="/asus.jpeg"
                    onClick={all}
                    alt="All"
                />
                <img
                    className={selectedCategory === "laptop" ? "active" : ""}
                    src="/asus2.jpg"
                    onClick={laptops}
                    alt="Laptops"
                />
                <img
                    className={selectedCategory === "phone" ? "active" : ""}
                    src="/s24.jpg"
                    onClick={phones}
                    alt="Phones"
                />
                <img
                    className={selectedCategory === "tv" ? "active" : ""}
                    src="/qled.jpeg"
                    onClick={television}
                    alt="Television"
                />
            </div>

            <div className='MainContent' id="items" style={modeStyle}>
                {
                    !filterItems.length > 0 ? <p>Loading... Please wait a moment</p> : filterItems.map((item, index) => (
                        <div key={item.id} className='item' style={modeStyle}>
                            <img
                                src={item.url}
                                onClick={() => navigate(`/items/${item.id}`)}
                                alt={item.name}
                            />
                            <h1 onClick={() => navigate(`/items/${item.id}`)}>{item.name}</h1>
                            <p><strong>Price:</strong> ₹{item.price}</p>
                            <p>{item.description}</p>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
