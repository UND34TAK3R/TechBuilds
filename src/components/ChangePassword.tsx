import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/SignUpForm.css';

function ChangePassword() {
    const { token } = useParams(); // Get token from URL params
    const navigate = useNavigate(); // Hook for navigation
    const [isValid, setIsValid] = useState(false); // State to track token validity

    // Validate token on component mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) return; // Ensure token exists
    
            try {
                const response = await fetch(`http://localhost:5500/changepassword/${token}`); // Update URL to use port 5500
                console.log('Token Validation Response:', response);
    
                if (response.ok) {
                    setIsValid(true);
                    console.log('isValid:', isValid);
                } else {
                    const result = await response.json();
                    alert(result.message || 'Invalid or expired token'); // Notify user
                    navigate('/'); // Redirect to homepage or login page
                }
            } catch (error) {
                console.error('Error validating token:', error);
                alert('An error occurred while validating the token.');
                navigate('/');
            }
        };
    
        validateToken();
    }, [token, navigate]);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const form = event.currentTarget;
        const password = form.Password.value;

        if (!password) {
            alert('Please fill in all fields.');
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must have at least 8 characters, including one number and one special character.');
            return;
        }

        const userData = { password, token }; // Include the token

        try {
            const response = await fetch('http://localhost:5500/changepassword', { // Update URL to use port 5500
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setIsValid(true);
            } else {
                const result = await response.json();
                alert(result.message || 'Invalid or expired token'); // Notify user
                navigate('/'); // Redirect to homepage or login page
            }
        } catch (error) {
            console.error('Error during password change:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Change Password</h1>
                {isValid ? (
                    <form onSubmit={handleSubmit} noValidate className="container">
                        <div className="passwordbox">
                            <label className="label" htmlFor="Password">Password: </label>
                            <input 
                                type="password" 
                                id="Password" 
                                name="Password"
                                className="Input" 
                                placeholder="New Password" 
                                required
                                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                            />
                            <small className="small-text">Password must have at least 8 characters, including one number and one special character</small>
                        </div>
                        <div className='inputbox'>
                            <button className="btn" type="submit">Change Password</button>
                        </div>
                    </form>
                ) : !isValid && token ? ( // Show loading state only if token is being validated
                    <p>Validating token...</p>
                ) : (
                    <p>No token provided.</p> // Handle case when no token is available
                )}
            </div>
        </div>
    );
    
}

export default ChangePassword;
