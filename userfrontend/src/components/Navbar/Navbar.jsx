// src/components/Navbar/Navbar.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ showLogin, setShowLogin, toggleTheme, currentTheme }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const nav = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    nav('/');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/"><img className="logo" src={assets.logo} alt="Logo" /></Link>
        <ul className="navbar-menu">
          <Link to="/" className={menu === 'home' ? 'active' : ''} onClick={() => setMenu('home')}>Home</Link>
          <Link to="/#food-display" className={menu === 'menu' ? 'active' : ''} onClick={() => setMenu('menu')}>Menu</Link>
          <Link to="/#footer" className={menu === 'contact-us' ? 'active' : ''} onClick={() => setMenu('contact-us')}>Contact</Link>
        </ul>
        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="dot-basket">
            <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
            {getTotalCartAmount() !== 0 && <div className="dot" />}
          </div>
          {!token ? (
            <button className="signin-btn" onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <Link to="/myorders"><img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
