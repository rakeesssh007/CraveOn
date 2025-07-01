import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import AdminMenu from './components/AdminMenu/AdminMenu';
import CreateItem from './screens/CreateItem/CreateItem';
import Inventory from './screens/Inventory/Inventory';
import Orders from './screens/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import './App.css';

const url = 'http://localhost:4000';

const App = () => {
  return (
    <div className="admin-app">
      <ToastContainer />
      <Navbar />
      <hr className="divider" />
      <div className="admin-layout">
        <AdminMenu />
        <main className="admin-main">
          <Routes>
            <Route path="/" element={<Dashboard url={url} />} />
            <Route path="/create" element={<CreateItem url={url} />} />
            <Route path="/inventory" element={<Inventory url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
