// MyOrders.jsx
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import Loader from "../../components/Loader/Loader";
import { assets } from "../../assets/assets";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${url}/api/order/userorders`, { headers: { token } })
      .then((res) => setOrders(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader />;

  return (
    <div className="my-orders container">
      <h2>My Orders</h2>
      {!orders.length ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((o, i) => (
            <div key={i} className="order-row">
              <img src={assets.parcel_icon} alt="parcel" />
              <p className="order-items">
                {o.items.map((it, idx) => (
                  <span key={idx}>
                    {it.name} × {it.quantity}
                    {idx < o.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>₹{o.amount}</p>
              <p>Items: {o.items.length}</p>
              <p className={`status ${o.status.toLowerCase()}`}>
                • <b>{o.status}</b>
              </p>
              <button onClick={() => window.location.reload()}>Refresh</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
