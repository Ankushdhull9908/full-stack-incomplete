import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DescriptionOfItems.css'; // Import the CSS file

export default function DescriptionOfItems(props) {
  const modeStyle = {
    backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
  };

  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(''); // State to store new comment
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [item, setItem] = useState(null); // State to store the current item
  const navigate = useNavigate();
  const token = localStorage.getItem("userdata");
  const username = token ? JSON.parse(token) : null;
  const { id } = useParams(); // Get ID from URL
  const numericId = Number(id); // Convert ID to number
  const [flaglike,setflaglike] = useState(false)
  const [imagestate,setImageState] = useState()
  const [productimgarr,setProductimgarr] = useState()

  console.log(item)

  // Fetch the specific item by ID if it's not available in props.allItems
  useEffect(() => {
    if (props.allItems.length > 0) {
      // If items are already available in props, find the item
      const foundItem = props.allItems.find((item) => item.id === numericId);
      
      setItem(foundItem);
      setImageState(foundItem.url)
    } else {
      // If props.allItems is empty, fetch the specific item data
      const fetchItemById = async () => {
        try {
          const response = await fetch(`https://full-stack-incomplete.onrender.com/api/items/${numericId}`);
          if (!response.ok) {
            throw new Error('Item not found');
          }
          const itemData = await response.json();
          
          setItem(itemData);
          setImageState(itemData.url)
          console.log(item.url)
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };

      fetchItemById();
    }
  }, [props.allItems, numericId]);
 

  // Fetch comments when the component is mounted or when `numericId` changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch("https://full-stack-incomplete.onrender.com/allcomments", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json(); // Convert the response to JSON

        // Check if the result is an array before setting it
        if (Array.isArray(result)) {
          setComments(result); // Set the comments state with the fetched data
        } else {
          console.error('Fetched comments data is not an array');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (numericId) {
      fetchComments(); // Call the async function to fetch comments
    }
  }, [numericId]);

  // Filter comments by item ID

  useEffect(()=>{
    
  },[comments])
  const filteredComments = comments.filter((comment) => comment.itemId === numericId);
  console.log(filteredComments)
  
 
  const handleAddToCart = () => {
   
      if (!username) {
        alert("please login first");
        navigate("/form");
    } else {
        const itemData = {
            itemId: item.id,
            itemUrl: item.url,
            itemDescription: item.description,
            itemName: item.name,
            itemQuantity: item.quantity,
            itemPrice: item.price,
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
            }); 

        } catch (error) {
            console.log(error);
        }
    }
  };

  // Handle comment form submission
  const handleSubmit = async (e) => {
    const like = 0
    e.preventDefault();

    const commentData = {
      name: username.user.name,
      itemId: numericId, // Use the numeric ID here
      comment: newComment,
      numberoflikes:like
    };

    console.log(commentData)

    try {
      const response = await fetch("https://full-stack-incomplete.onrender.com/comment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setNewComment(''); // Clear the comment input after successful submission
        // fetchComments(); // Re-fetch the comments after adding a new one
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('There was an error posting the comment:', error);
    }
  };

  // Show a loading indicator if still fetching data
  if (!item) {
    return <div>Loading item...</div>;
  }

  function deletecomment(index){
    
    const deletecommentdata = {comment:filteredComments[index].comment,username:filteredComments[index].name}


    try{
      fetch('https://full-stack-incomplete.onrender.com/deletecomment',{
        method:"Post",headers:{
          'Content-type':'Application/json'
        },body:JSON.stringify(deletecommentdata)
      })

      alert("comment deleted")
      
    }catch(error){

    }
    
  }


  function giveLike(index){
        

       const commentlikedata = {itemId : filteredComments[index].itemId,
        comment: filteredComments[index].comment}
        console.log(commentlikedata)

        try{
           fetch('https://full-stack-incomplete.onrender.com/givelike',
            {
              method:"Post",headers:{
                'Content-type':'Application/json'
              },body:JSON.stringify(commentlikedata)
            }
           )
          setflaglike(true)
        }catch(error){
          console.log(error)
        }
  }


    
  
  
  

  return (
    <div className="container" style={modeStyle}>
      <div className='imagesection'>
      <div className='verticalimages'>
      {
          Object.entries(item.images).map(([key, value]) => (
        <img 
            key={key}
            src={value} 
            onMouseOver={(e) => {
                console.log(setImageState(e.target.src)); 
            }}/>
           ))
      }

        
      </div>
      <div className='bigproductimg'>
      <img src={imagestate} alt={item.name} />
      </div>
      </div>
      
     
      <div className="item-details">
        <h1 className="item-title">{item.name}</h1>
        <p className="item-price"><strong>Price:</strong> ₹{item.price}</p>
        <p className="item-description">{item.description}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {item.specifications && (
          <div className="specifications">
            <h2>Specifications</h2>
            <table className="specifications-table">
              <tbody>
                {Object.entries(item.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                    <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Comment Section */}
      <div className="comments-section">
        <h2>Reviews</h2>
        {/* Display comments */}
        <div className="comments-list">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment, index) => (
              <div key={index} className="comment">
                <p><b>{comment.name}:</b> {comment.comment}</p>
                <p id="viewson"><i>views on:</i> {item.name}</p>
                {
                  comment.name===username.user.name?<button id="deletebtn" onClick={()=>{
                    deletecomment(index)
                  }}>delete</button>:<p></p>
                }
                {
                  comment.name === username.user.name?<p></p>:<button disabled={flaglike} onClick={()=>{
                    giveLike(index)
                  }}>Like</button>
                }
                <p id="nooflikes">{comment.numberoflikes}</p>
                
                
              </div>
            ))
          ) : (
            <p>No comments yet. Be The First One To Comment</p>
          )}
        </div>

        {/* Comment Form */}
        <form
          className="comment-form"
          onSubmit={(e) => {
            if (!username) {
              alert("Please log in first");
              navigate("/form");
            } else {
              handleSubmit(e);
            }
          }}
        >
          
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Comment as ${!username ? "user" : username.user.name}`}
            required
          />
          
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
}
