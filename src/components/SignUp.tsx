import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css';

function SignUp() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior
    
        const form = event.currentTarget; // Gets the form element
        const username = form.Username.value;
        const email = form.Email.value;
        const password = form.Password.value;
    
        // Simple client-side validation
        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
    
        // Additional validation checks (e.g., password rules)
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must have at least 8 characters, including one number and one special character.');
            return;
        }
    
        const userData = { username, email, password };
    
        try {
            const response = await fetch('http://localhost:5500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert(result.message); // Show success message
                if (rememberMe) {
                    localStorage.setItem('userData', JSON.stringify({ username, email, password }));
                } else {
                    localStorage.removeItem('userData');
                }
                navigate('/'); // Redirect to the main page after successful sign-up
            } else {
                alert(result.message); // Show error message, stay on the same page
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-form">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} noValidate className="container">
                    <div className="inputbox">
                        <label className="label" htmlFor="Username">Username: </label>
                        <input 
                            type="text" 
                            id="Username" 
                            name="Username"
                            className="Input" 
                            placeholder="Username" 
                            required
                        />
                    </div>
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
                            title="Password must have at least 8 characters, including one number and one special character."
                        />
                        <small className="small-text">Password must have 8 characters including one number and one special character</small>
                    </div>
                    <input type="checkbox" 
                            id="Remember" 
                            name="Remember"
                            className="check"
                            checked={rememberMe}
                            onChange={() => setRememberMe(prev => !prev)}/><label id='Remember' htmlFor="Remember">Remember me</label>
                    <div className='inputbox'><button className="btn" type="submit">Sign Up</button></div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;