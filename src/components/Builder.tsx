import { Link } from 'react-router-dom';
import '../css/Builder.scss';
import useAuth from './UserAuth'; // Import the custom hook
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Layout/Header';
import NewBuild from './NewBuild';

function Builder() {
  const { isLoggedIn, loading, userId } = useAuth(); // Use the hook with loading and isLoggedIn
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [hasBuild, setHasBuild] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      setShowLoginMessage(true);
    } else {
      setShowLoginMessage(false);
    }
    if(isLoggedIn){
      fetchLastBuild();
    }
  }, [isLoggedIn, loading]);

  const fetchLastBuild = async () => {
    try {
      const response = await fetch(`http://localhost:5500/lastBuild/${userId}`);
      const result = await response.json();
      if (response.ok && result) {
        setBuildName(result.build_name); // Set the build name
        setHasBuild(true); // Set hasBuild to true
        setShowPopUp(false); // Close the popup
      } else {
        setHasBuild(false); // No build found
      }
    } catch (error) {
      console.error('Error fetching last build:', error);
    }
  };
  const handleNewBuild = async (newBuildData:any) => {
    try {
      const response = await fetch('http://localhost:5500/NewBuild', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBuildData),
      });
      if (response.ok) {
        fetchLastBuild(); // Fetch the last build again after creating a new build
      } else {
        console.error('Error creating new build');
      }
    } catch (error) {
      console.error('Error creating new build:', error);
    }
  };

  useEffect(() => {
    if (!hasBuild) {
      setShowPopUp(true); // Show the popup if there is no build
    }
  }, [hasBuild]);  // This ensures hooks are always called the same way

  useEffect(() => {
    if (userId) { // Make sure userId is defined
      fetchLastBuild();
    }
  }, [userId]); 

  function handleClose() {
    setShowPopUp(false);
  }

  if (showLoginMessage) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.messageBox}>
          <h2>To use our Builder, you need to be logged in</h2>
          <button
            style={styles.button}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
        <div style={styles.blurredBackground}></div>
      </div>
    );
  }

  if (loading) {
    // Display a loading spinner while checking authentication
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.spinner}>Loading...</div>
      </div>
    );
  }

  
return(
 <> 
    <Header />
    <span>Build Name :{buildName || 'No Build Selected'}</span>
    <table className="table">
        <thead>
          <tr>
            <th scope="col">Component</th>
            <th scope="col">Part Name</th>
            <th scope="col" colSpan={2}>Description</th>
            <th scope="col">Price</th>
            <th scope="col">Purchased</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope= "row"><Link to="/Motherboard">Motherboard</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/Motherboard"><button className="btn btn-outline-dark">Add Motherboard</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/CPU">CPU</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/CPU"><button className="btn btn-outline-dark">Add CPU</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/CPU_Cooler">CPU Cooler</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/CPU_Cooler"><button className="btn btn-outline-dark">Add CPU Cooler</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/RAM">RAM</Link></th>
            <td></td>
            <td></td>
            <td></td>
          <td> <Link to="/RAM"><button className="btn btn-outline-dark">Add RAM</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/GPU">GPU</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/GPU"><button className="btn btn-outline-dark">Add GPU</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/Storage">Storage</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/Storage"><button className="btn btn-outline-dark">Add Storage</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/PSU">PSU</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/PSU"><button className="btn btn-outline-dark">Add PSU</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/Case">Case</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/Case"><button className="btn btn-outline-dark">Add Case</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/OS">OS</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/OS"><button className="btn btn-outline-dark">Add OS</button></Link></td>
          </tr>
          <tr>
          <th scope="row"><Link to="/NetAdapter"> Network Adapter</Link></th>
            <td></td>
            <td></td>
            <td></td>
            <td><Link to="/NetAdapter"><button className="btn btn-outline-dark">Add Network Adapter</button></Link></td>
          </tr>
      </tbody>
    </table>
    <div><button>Save Build</button>
    <button onClick={() => setShowPopUp(true)}>New Build</button>
    <button>Change Build</button></div>
    {showPopUp && <NewBuild handleNewBuild={handleNewBuild} handleClose={handleClose} />}
</>
)}

const styles = {
  wrapper: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    zIndex: 10,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center' as 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  blurredBackground: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(8px)',
    zIndex: 1,
  },
  loadingWrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light background color for loading state
  },
  spinner: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
};

export default Builder