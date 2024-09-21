import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './components/Homepage';
import NavBar from './components/NavBar';
import Benchmark from './components/Benchmark';
import Contact from './components/Contact'; 
import Builder from './components/Builder';
import PreBuilt from './components/Prebuilt';
import Parts from './components/Parts';
import SignUp from './components/SignUp'; 
import Login from './components/Login';
import ForgotPasswd from './components/ForgotPasswd';

function App() {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
}

function RoutesWrapper() {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const isForgotPasswdPage = location.pathname === '/forgotpasswd';

  return (
    <>
      {!isSignUpPage && !isLoginPage && !isForgotPasswdPage && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Builder" element={<Builder />} />
        <Route path="PreBuilt" element={<PreBuilt />} />
        <Route path="Parts" element={<Parts />} />
        <Route path="Benchmark" element={<Benchmark />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />}/>
        <Route path="forgotpasswd" element={<ForgotPasswd />}/>
      </Routes>
    </>
  );
}
export default App;
