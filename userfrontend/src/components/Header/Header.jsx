import React from 'react';
import './Header.css';
import headerImg from '../../assets/header_img.png';

const Header = () => (
  <div className="header">
    <div className="container header-content">
      <div className="text-block">
        <h2>Unleash the Beast Within</h2>
        <p>
          Forget polite portions — it's time to devour meals built for legends. With bold flavors, sizzling spices,
          and beast‑sized servings, CraveOn brings the fire straight to your plate. Eat like you mean it — anytime, anywhere.
        </p>
        <a href="#food-display"><button>Summon the Menu</button></a>
      </div>
      <div className="image-block">
        <img src={headerImg} alt="Beast Feast" />
      </div>
    </div>
  </div>
);

export default Header;
