import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    items: 0,
    orders: 0,
    pending: 0
  });

  const fetchStats = async () => {
    try {
      const itemsRes = await axios.get(`${url}/api/food/list`);
      const ordersRes = await axios.get(`${url}/api/order/list`);
      const orders = ordersRes.data.data || [];

      const pendingCount = orders.filter(order => order.status === 'Food Processing').length;

      setStats({
        items: itemsRes.data.data.length,
        orders: orders.length,
        pending: pendingCount
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err.message);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="screen dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <img src={assets.dashboard_icons.items} alt="Items" />
          <p className="dashboard-count">{stats.items}</p>
          <p className="dashboard-label">Total Items</p>
        </div>

        <div className="dashboard-card">
          <img src={assets.dashboard_icons.orders} alt="Orders" />
          <p className="dashboard-count">{stats.orders}</p>
          <p className="dashboard-label">Total Orders</p>
        </div>

        <div className="dashboard-card">
          <img src={assets.dashboard_icons.pending} alt="Pending" />
          <p className="dashboard-count">{stats.pending}</p>
          <p className="dashboard-label">Pending Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
