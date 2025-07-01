import { useEffect, useState } from "react";
import "./Orders.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      setOrders(res.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const updateOrderStatus = async (e, orderId) => {
    try {
      await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      fetchAllOrders(); // refresh after update
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="screen order-screen">
      <h2>Orders</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div className="order-details">
              <p className="order-item-food">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address.first_name} {order.address.last_name}
              </p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zip_code}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>{order.items.length} items</p>
            <p>₹{order.amount}</p>
            <select
              className="order-status-select"
              value={order.status}
              onChange={(e) => updateOrderStatus(e, order._id)}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
