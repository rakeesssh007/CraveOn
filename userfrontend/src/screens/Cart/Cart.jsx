import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const total = subtotal + 20;

  const items = food_list.filter((f) => cartItems[f._id] > 0);

  return (
    <div className="cart container">
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <span>Image</span>
              <span>Title</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span>Modify</span>
            </div>
            <hr />
            {items.map((food) => (
              <div key={food._id}>
                <div className="cart-items-item">
                  <img
                    className="food-image"
                    src={`${food.image}`}
                    alt={food.name}
                  />
                  <span>{food.name}</span>
                  <span>₹{food.price}</span>
                  <span>{cartItems[food._id]}</span>
                  <span>₹{cartItems[food._id] * food.price}</span>
                  <span className="cart-counter-cell">
                    <div className="cart-counter">
                      <img
                        onClick={() => removeFromCart(food._id)}
                        src={assets.remove_icon_red}
                        alt="remove"
                      />
                      <img
                        onClick={() => addToCart(food._id)}
                        src={assets.add_icon_green}
                        alt="add"
                      />
                    </div>
                  </span>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div className="cart-total-details">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="cart-total-details">
                <span>Delivery</span>
                <span>₹20</span>
              </div>
              <div className="cart-total-details total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                disabled={subtotal === 0}
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
            <div className="cart-promocode">
              <p>If you have a promo code, enter it here:</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter promo code" />
                <button>Apply</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
