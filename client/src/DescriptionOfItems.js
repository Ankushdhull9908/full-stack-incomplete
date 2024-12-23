import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DescriptionOfItems.css'; // Import the CSS file
import Footer from './Footer';

export default function DescriptionOfItems(props) {
  const modeStyle = {
    backgroundColor: props.mode === 'dark' ? 'white' : 'grey',
  };
  const [category,setCategory] = useState("")
  const [comments, setComments] = useState([]); // State to store comments
  const [categoryitem1,setCategoryitems] =useState([])
  const [newComment, setNewComment] = useState(''); // State to store new comment
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loadingg
  const [item, setItem] = useState(null); // State to store the current item
  const navigate = useNavigate();
  const token = localStorage.getItem("userdata");
 
  
  const username = token ? JSON.parse(token) : "";
  const { id } = useParams(); // Get ID from URL
  const numericId = Number(id); // Convert ID to number
  const [flaglike,setflaglike] = useState(false)
  const [imagestate,setImageState] = useState()
  
  const [filteredComments,setfilteredcomments] = useState([])
  const [hasliked,sethasliked] = useState([])
  const [likedcomments,setlikedcomments] = useState('')


  

  useEffect(() => {
    if (props.allItems.length > 0) {
      // If items are already available in props, find the item
      const foundItem = props.allItems.find((item) => item.id === numericId);
      
      setItem(foundItem);
      setImageState(foundItem.url);
      setCategory(foundItem.category);
    } else {
      // If props.allItems is empty, fetch the specific item data
      const fetchItemById = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`https://full-stack-incomplete.onrender.com/api/items/${numericId}`);
          if (!response.ok) {
            throw new Error('Item not found');
          }
          const itemData = await response.json();
          setItem(itemData);
          setCategory(itemData.category);
          setImageState(itemData.url);
        } catch (error) {
          console.error('Error fetching item:', error);
        } finally {
          setIsLoading(false); // Stop loading after fetch completes
        }
      };
  
      fetchItemById();
    }
  }, [numericId, props.allItems]);
  
  // Fetch items in the same category
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://full-stack-incomplete.onrender.com/api/items'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const categoryItems = data.filter(item => item.category === category);
        setCategoryitems(categoryItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    if (category) { // Fetch only if category is set
      fetchItems();
    }
  }, [category]); // Run this effect only when category changes
  

  
 

  // Fetch comments when the component is mounted or when `numericId` changes
  
  const fetchComments = async () => {
    if(username!==""){
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

      const result = await response.json(); 
      setflaglike(false)
      if (Array.isArray(result)) {
        setComments(result);
        console.log(result)

        // Filter comments based on `itemId` and current user
        const filtercom = result.filter((comment) => comment.itemId === numericId);
        setfilteredcomments(filtercom);
        // filter based on users
        const data = filtercom.filter((index) => index.likeby.includes(username.user.name));
        // filter based on comments
        const likefilter = data.map((i) => i.commentId);
        
        sethasliked(data);
        setlikedcomments(likefilter);
        
        console.log(hasliked);
        console.log(likedcomments);
      } else {
        console.error('Fetched comments data is not an array');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setIsLoading(false); 
    }

    }
    
  };




useEffect(() => {
    fetchComments()
}, [numericId]);


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
               fetch("https://full-stack-incomplete.onrender.com/api/addToCart", {
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
      commentId: Math.floor(Math.random() * 10000),
      name: username.user.name,
      itemId: numericId, 
      comment: newComment,
      numberoflikes:like,

    };

    console.log(commentData)
    console.log(item)

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
        setShowEmojiPicker(false);
         fetchComments(); // Re-fetch the comments after adding a new one
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
      fetchComments(); 
      
    }catch(error){

    }
    
  }


  function giveLike(index){
        
    setflaglike(true)
       const commentlikedata = {itemId : filteredComments[index].itemId,
        commentId:filteredComments[index].commentId,
        likeby:username.user.name}
        

        try{
           fetch('https://full-stack-incomplete.onrender.com/givelike',
            {
              method:"Post",headers:{
                'Content-type':'Application/json'
              },
              body:JSON.stringify(commentlikedata)
            }
           )
          
         
          fetchComments(); 
          
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
        <img alt='error'
            key={key}
            src={value} 
            onMouseOver={(e) => {
                setImageState(e.target.src)
            }}/>
           ))
      }

        
      </div>
      <div className='bigproductimg' >
      <img src={imagestate} alt={item.name}  className={item.category==="mobile" || item.category==="fridge" || item.category==="washing machine"? "mobilefridgewashingmachine" : "laptopled"}/>
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
      <div className='relateditemcategory'>
  
        {
                categoryitem1.map((item, index) => (
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

      
      <div className="comments-section">
        <h2>Reviews</h2>
     
        <div className="comments-list">
  {
    isLoading ? (
      <p>Loading</p>
    ) : (
      filteredComments.length > 0 ? (
        filteredComments.map((comment, index) => (
          <div key={index} className="comment">
            <p><b>{comment.name}:</b> {comment.comment}</p>
            <p id="viewson"><i>views on:</i> {item.name}</p>
            <div className='likedelete'>
            {
              comment.name === username.user.name ? (
               // <button id="deletebtn" onClick={() => deletecomment(index)}>delete</button>
                <img id="dellogo" src="/bin.png" alt="bin" onClick={() => deletecomment(index)} />
              ) : (
                <p></p>
              )
            }
            {
              likedcomments.includes(comment.commentId) ? (
                <span><img id="likedlogo" src='/like (1).png' alt="bin"/></span>
              ) : (
                <img id="likelogo" src="/like.png" alt="Like" onClick={() => giveLike(index)} />
     
              )
            }
            </div>
            <p id="nooflikes">{comment.numberoflikes}</p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be The First One To Comment</p>
      )
    )
  }
</div>


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
          
          <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder={`Comment as ${!username ? "user" : username.user.name}`}
            required/>
          
          <button id="cmtbtn" type="submit">Submit Comment</button>
          
        </form>
      </div>
      <Footer/>
    </div>
  );
}
