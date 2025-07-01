// PlaceOrder.jsx
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: "",
  });
  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate("/cart");
  }, [token]);

  const items = food_list
    .filter((f) => cartItems[f._id] > 0)
    .map((f) => ({
      ...f,
      quantity: cartItems[f._id],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${url}/api/order/place`,
        {
          address: data,
          items,
          amount: getTotalCartAmount() + 20,
        },
        { headers: { token } }
      );
      window.location.replace(resp.data.session_url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form className="place-order container" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <h2>Delivery Info</h2>
        <div className="multi-fields">
          <input
            name="first_name"
            placeholder="First Name"
            value={data.first_name}
            onChange={handleChange}
            required
          />
          <input
            name="last_name"
            placeholder="Last Name"
            required
            value={data.last_name}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <input
          name="street"
          placeholder="Street Address"
          required
          value={data.street}
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            name="city"
            placeholder="City"
            required
            value={data.city}
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            required
            value={data.state}
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            name="zip_code"
            placeholder="ZIP"
            required
            value={data.zip_code}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            required
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <input
          name="phone"
          placeholder="Phone Number"
          required
          value={data.phone}
          onChange={handleChange}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <span>Subtotal</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
          <div className="cart-total-details">
            <span>Delivery</span>
            <span>₹20</span>
          </div>
          <div className="cart-total-details total">
            <span>Total</span>
            <span>₹{getTotalCartAmount() + 20}</span>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
