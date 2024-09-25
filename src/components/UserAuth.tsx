import { useEffect, useState } from 'react';
import axios from 'axios';

// Custom hook to check if the user is logged in
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5500/user/status', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      })
      .catch((error) => {
        console.error('Error verifying token:', error);
        setIsLoggedIn(false); // Set to false if there's an error
      });
    } else {
      setIsLoggedIn(false); // No token means user is not logged in
    }
  }, []);

  return isLoggedIn;
}

export default useAuth;
