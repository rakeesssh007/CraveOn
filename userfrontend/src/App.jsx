// src/App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Home from './screens/Home/Home';
import MyOrders from './screens/MyOrders/MyOrders';
import Cart from './screens/Cart/Cart';
import Verify from './screens/Verify/Verify';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const themeLinkId = 'theme-link';
    let linkTag = document.getElementById(themeLinkId);

    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.id = themeLinkId;
      linkTag.rel = 'stylesheet';
      document.head.appendChild(linkTag);
    }

    linkTag.href = `/themes/${theme}.css`;
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
