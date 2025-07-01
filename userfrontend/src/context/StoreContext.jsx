import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = import.meta.env.VITE_API_URL;

const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    const foodDataWithImages = response.data.data.map((item) => ({
      ...item,
      image: `${url}/image/` + item.image,  // Assuming backend serves images from /images/
    }));
    setFoodList(foodDataWithImages);
  } catch (error) {
    console.error("Failed to fetch food list:", error);
  }
};

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []);

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { token },
      });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: Math.max(0, (cartItems[itemId] || 0) - 1),
    };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, {
          headers: { token },
        });
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((f) => f._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const contextValue = {
    cartItems,
    setCartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
