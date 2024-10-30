import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export default function Form(props) {
    const [formType, setFormType] = useState("LOGIN");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Only include the name in userData if formType is SIGNUP
        const userData = { 
            email: formData.email, 
            password: formData.password,
            ...(formType === "SIGNUP" && { name: formData.name })  // Conditionally add name field
        };

        const url = formType === "SIGNUP"
            ? "https://full-stack-incomplete-1.onrender.com/signup" 
            : "https://full-stack-incomplete-1.onrender.com/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`${formType} successful!`);
                console.log(result);

                localStorage.setItem("userdata", JSON.stringify(result));
                // Update parent component's state and navigate to dashboard
                props.setsignupbtn(`Hello ${result.user.name}`);
                navigate(`/dashboard/${result.user.name}`);
            } else {
                const errorResult = await response.json();
                alert(`${formType} failed: ${errorResult.message}`);
            }
        } catch (error) {
            alert(`${formType} failed: ${error.message}`);
        }
    };

    // Handle input change for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h1>{formType}</h1>
                {formType === "SIGNUP" && (
                    <div>
                        NAME:<input 
                            type='text' 
                            name='name' 
                            value={formData.name} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                )}
                <div>
                    Email:<input 
                        type='email' 
                        name='email' 
                        value={formData.email} 
                        required 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    Password:<input 
                        type='password' 
                        name='password' 
                        value={formData.password} 
                        required 
                        onChange={handleChange} 
                    />
                </div>
                {formType === "LOGIN" ? <p>Forgot Pass?</p> : null}
                {formType === "LOGIN" 
                    ? <p onClick={() => setFormType("SIGNUP")}>Don't have an Account? Sign up</p> 
                    : <p onClick={() => setFormType("LOGIN")}>Already have an Account? Login</p>}
                <button type="submit">{formType}</button>
            </form>
        </div>
    );
}
