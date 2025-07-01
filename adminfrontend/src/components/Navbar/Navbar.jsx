import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <p className="navbar-welcome">Welcome, Admin</p>
      </div>

      <div className="navbar-center">
        <Link to="/">
        <img className="navbar-logo" src={assets.logo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <img className="navbar-avatar" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
