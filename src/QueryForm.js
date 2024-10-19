import React, { useEffect, useState } from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const QueryForm = () => {
  const navigate = useNavigate();
  
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');

  const userdata = localStorage.getItem("userdata");
  const udata = JSON.parse(userdata);

  useEffect(() => {
    if (udata) {
        
      setname(udata.user.name);
      setEmail(udata.user.email);
    }else{
        alert("Please Login First")
        navigate("/form")
    }
  }, [udata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const queryformdata = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };

    try {
      const response = await fetch("http://localhost:7600/query", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryformdata),
      });

      if (response.ok) {
        alert("Thank you for your feedback");
        navigate("/");
      } else {
        alert("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='queryform'>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            required
            rows={10}
            cols={40}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QueryForm;
