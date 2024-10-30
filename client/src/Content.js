import React, { useState, useEffect } from 'react';
import './Content.css';
import Hero1 from './Hero1.js';
import { useNavigate } from 'react-router-dom';

export default function Content(props) {
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [alldata,setAlldata] = useState([])
    const navigate = useNavigate();
    const [filterItems, setFilterItems] = useState([]);


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
            setFilterItems(data.slice(0,10)); 
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems(); 
    }, []);

    
    function phones() {
        setSelectedCategory("phone");
        const filteredPhones = alldata.filter(i => i.category === "phone");
        setFilterItems(filteredPhones);
    }

    function laptops() {
       
        setSelectedCategory("laptop");
        console.log(alldata)
        const filteredLaptops = alldata.filter(i => i.category === "laptop");
        setFilterItems(filteredLaptops);
       
    }

    function all() {
        setSelectedCategory("all");
        setFilterItems(props.allItems); 
    }

    function television() {
        setSelectedCategory("tv");
        const filteredTVs = alldata.filter(i => i.category === "tv");
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
                    filterItems.length === 0 ? <p>Loading... Please wait a moment</p> : filterItems.map((item, index) => (
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
