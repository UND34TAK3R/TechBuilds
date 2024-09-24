import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css';

const NOT_LOGGED_IN = false;
const LOGGED_IN = true;
let status = NOT_LOGGED_IN;


function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const form = event.currentTarget;
        const email = form.Email.value;
        const password = form.Password.value;

        const userData = { email, password };

        try {
            const response = await fetch('http://localhost:5500/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful!');
                status = LOGGED_IN;

                // If login is successful, redirect to the homepage
                navigate('/');

                // Optionally save JWT or session info
                // e.g., localStorage.setItem('token', result.token);

            } else {
                alert(result.message); // Display error message from the server
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
                        <input 
                        type="checkbox" 
                        id="Remember" 
                        name="Remember"
                        className="check"
                        checked={rememberMe}
                        onChange={() => setRememberMe(prev => !prev)}
                        />
                        <label htmlFor="Remember">Remember me</label><br></br>
                    
                        <small><Link to="/forgotpasswd">Don't remember your password?</Link></small><br></br>
                        <small><Link to="/signup">Don't have an account?</Link></small>
                    </div>
                    <div className='inputbox'>
                        <button className="btn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
