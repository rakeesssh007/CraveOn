import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './AdminMenu.css';

const menuLinks = [
  { path: '/create', icon: assets.add_icon, label: 'Create Item' },
  { path: '/Inventory', icon: assets.list_icon, label: 'Inventory' },
  { path: '/orders', icon: assets.order_icon, label: 'Orders' },
];

const AdminMenu = () => {
  return (
    <aside className="admin-menu">
      <nav className="menu-nav">
        {menuLinks.map(({ path, icon, label }) => (
          <NavLink
            to={path}
            key={label}
            className={({ isActive }) =>
              `menu-link ${isActive ? 'active' : ''}`
            }
          >
            <img src={icon} alt={label} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminMenu;
