import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css';

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        const email = form.Email.value;
        const password = form.Password.value;
    
        const userData = { email, password };
    
        try {
            const response = await fetch('http://localhost:5500/login', { // Ensure this is the correct port
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            // Check if the response is successful
            if (response.ok) {
                const result = await response.json(); // Now it's safe to parse JSON
                console.log('Login successful:', result);
                // Save token to localStorage
                localStorage.setItem('token', result.token);
                navigate('/');
            } else {
                const errorResult = await response.text(); // Get error message
                alert(errorResult || 'An error occurred during login.'); // Display error message from the server
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    
        // Handle "Remember me" option
        if (rememberMe) {
            localStorage.setItem('userData', JSON.stringify({ email, password }));
        } else {
            localStorage.removeItem('userData');
        }
    };    

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} noValidate className="container">
                    <div className="inputbox">
                        <label className="label" htmlFor="Email">Email: </label>
                        <input 
                            type="email" 
                            id="Email" 
                            name="Email" 
                            className="Input" 
                            placeholder="Email" 
                            required
                        />
                    </div>
                    <div className="passwordbox">
                        <label className="label" htmlFor="Password">Password: </label>
                        <input 
                            type="password" 
                            id="Password" 
                            name="Password"
                            className="Input" 
                            placeholder="Password" 
                            required
                            pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                        />
                        <div>
                            <input 
                                type="checkbox" 
                                id="Remember" 
                                name="Remember"
                                className="check"
                                checked={rememberMe}
                                onChange={() => setRememberMe(prev => !prev)}
                            />
                            <label htmlFor="Remember">Remember me</label>
                        </div>
                        <small><Link to="/forgotpasswd">Don't remember your password?</Link></small><br />
                        <small><Link to="/signup">Don't have an account?</Link></small>
                    </div>
                    <div className='inputbox'>
                        <button className="btn" id="login"type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
