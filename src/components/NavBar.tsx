import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify the token with the backend
      axios.get('http://localhost:5500/user/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })      
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log(response.data);
          console.log(response.data.username);
          setUsername(response.data.username); 
        }
      })
      .catch((error) => {
        console.error('Error fetching user status:', error);
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false); // No token means user is not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername(''); // Clear the username on logout
    navigate('/'); // Redirect to homepage or login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TechBuilds</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Builder">Builder</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="prebuilt"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Prebuilt
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Desktop">Desktops</Link></li>
                <li><Link className="dropdown-item" to="/">Laptops</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Parts">Parts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Benchmark">Benchmark</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Contact">Contact Us</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">{username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
