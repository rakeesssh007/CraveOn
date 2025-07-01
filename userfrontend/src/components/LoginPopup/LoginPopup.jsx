import { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [mode, setMode] = useState('Log In');
  const [data, setData] = useState({ name:'', email:'', password:'' });

  const onChange = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    const endpoint = mode==='Log In' ? '/api/user/login' : '/api/user/register';
    try {
      const res = await axios.post(url + endpoint, data);
      if (mode==='Sign Up') {
        toast.success('Account created! Please Log in.');
        setMode('Log In');
      } else {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setShowLogin(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{mode}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Close"/>
        </div>
        <div className="login-popup-inputs">
          {mode !== 'Log In' && (
            <input name="name" value={data.name} onChange={onChange} placeholder="Your Name" required/>
          )}
          <input name="email"    value={data.email}    onChange={onChange} placeholder="Your Email"    required/>
          <input name="password" value={data.password} onChange={onChange} placeholder="Password"       required/>
        </div>
        <button type="submit">{mode}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to terms & privacy policy</p>
        </div>
        {mode==='Log In' ? (
          <p>Create a new account? <span onClick={()=>setMode('Sign Up')}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={()=>setMode('Log In')}>Log in here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
