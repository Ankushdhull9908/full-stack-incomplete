import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Form.css';

export default function Form(props) {
    const [formType, setFormType] = useState("LOGIN");
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const userData = { 
            name: formType=== "SIGNUP"? name: undefined,
            email: email, 
            password: pass 
        };

        const url = formType==="SIGNUP"?"http://localhost:7600/signup" : "http://localhost:7600/login";
        
    

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
                console.log(result)
                
                localStorage.setItem("userdata",JSON.stringify(result))
                // Redirect based on formType or handle response accordingly
                props.setsignupbtn(`Hello ${result.user.name}`)
                navigate(`/dashboard/:${result.user.name}`);
            } else {
                const errorResult = await response.json();
                alert(`${formType} failed: ${errorResult.message}`);
            }
        } catch (error) {
            alert(`${formType} failed: ${error.message}`);
        }
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <h1>{formType}</h1>
                {formType === "SIGNUP" && (
                    <div>
                        NAME:<input type='text' value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                <div>
                    Email:<input type='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    Password:<input type='password' value={pass} required onChange={(e) => setPass(e.target.value)} />
                </div>
                {
                    formType === "LOGIN" ? <p>Forgot Pass?</p> : null
                }
                {
                    formType === "LOGIN" ? 
                    <p onClick={() => setFormType("SIGNUP")}>Don't have an Account? Sign up</p> : 
                    <p onClick={() => setFormType("LOGIN")}>Already have an Account? Login</p>
                }
                <button type="submit">{formType}</button> {/* Submit button for form */}
            </form>
        </div>
    );
}




