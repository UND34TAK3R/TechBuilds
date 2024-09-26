import { useEffect, useState } from 'react';
import axios from 'axios';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5500/user/status', {
          headers: { Authorization: `Bearer ${token}` },
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
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the check is complete
        });
    } else {
      setIsLoggedIn(false);
      setLoading(false); // No token, end loading
    }
  }, []);

  return { isLoggedIn, loading };
}

export default useAuth;
