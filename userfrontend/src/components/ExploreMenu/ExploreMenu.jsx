import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => (
  <div className='explore-menu'>
    <h1>Explore Our Menu</h1>
    <p className='explore-menu-text'>
      Choose from a flavorful spread curated to excite every craving — from comforting classics to bold new bites.
    </p>
    <div className="explore-menu-list">
      {menu_list.map((item, idx) => (
        <div
          key={idx}
          className="explore-menu-list-item"
          onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)}
        >
          <img
            src={item.menu_image}
            alt={item.menu_name}
            className={category === item.menu_name ? "active" : ""}
          />
          <p>{item.menu_name}</p>
        </div>
      ))}
    </div>
    <hr />
  </div>
);

export default ExploreMenu;
