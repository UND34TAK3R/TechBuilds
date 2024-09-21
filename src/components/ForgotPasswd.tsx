
import { useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css';

function ForgotPasswd() {
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const form = event.currentTarget;
        const email = form.Email.value;

        const userData = { email};

        try {
            const response = await fetch('http://localhost:5500/forgotpasswd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Email sent!');

                // If login is successful, redirect to the homepage
                navigate('/login');

                // Optionally save JWT or session info
                // e.g., localStorage.setItem('token', result.token);

            } else {
                alert(result.message); // Display error message from the server
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Forgot Password</h1>
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
                    <div className='inputbox'>
                        <button className="btn" type="submit">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswd;
