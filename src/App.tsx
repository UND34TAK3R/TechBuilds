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
import ChangePassword from './components/ChangePassword';
import CPU from './components/Parts/CPU';
import CPU_Cooler from './components/Parts/CPU_Cooler';
import GPU from './components/Parts/GPU';
import Motherboard from './components/Parts/Motherboard';
import RAM from './components/Parts/RAM';
import Storage from './components/Parts/Storage';
import PSU from './components/Parts/PSU';
import NetAdapter from './components/Parts/NetAdapter';
import OS from './components/Parts/OS';
import Desktop from './components/Prebuilt/Desktop';
import Laptop from './components/Prebuilt/Laptop';
import Footer from './components/Layout/Footer';
import Case from './components/Parts/Case';

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
  const isChangePasswordPage = location.pathname.startsWith('/reset-password');  // Update this line

  return (
    <>
      {!isSignUpPage && !isLoginPage && !isForgotPasswdPage && !isChangePasswordPage  && <NavBar />}
      {!isSignUpPage && !isLoginPage && !isForgotPasswdPage && !isChangePasswordPage  && <Footer />}
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/Builder" element={<Builder />} />
        <Route path="PreBuilt" element={<PreBuilt />} />
        <Route path="Parts" element={<Parts />} />
        <Route path="Benchmark" element={<Benchmark />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotpasswd" element={<ForgotPasswd />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} /> {/* Updated route */}
        <Route path="/CPU" element={<CPU />} />
        <Route path="/CPU_Cooler" element={<CPU_Cooler />} />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/Motherboard" element={<Motherboard />} />
        <Route path="/RAM" element={<RAM />} />
        <Route path="/Storage" element={<Storage />} />
        <Route path="/PSU" element={<PSU />} />
        <Route path="/NetAdapter" element={<NetAdapter />} />
        <Route path="/OS" element={<OS />} />
        <Route path="/Desktop" element={<Desktop />} />
        <Route path="/Laptop" element={<Laptop />} />
        <Route path="/Case" element={<Case />} />
      </Routes>
    </>
  );
}

export default App;
