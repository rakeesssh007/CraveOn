import { useState, useEffect } from "react";
import "./Inventory.css";
import axios from "axios";
import { toast } from "react-toastify";

const Inventory = ({ url }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setItems(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove?id=${id}`);
      toast(response.data.message);
      fetchItems(); // refresh after delete
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="inventory-screen">
      <h2>Inventory</h2>
      <div className="inventory-table">
        <div className="inventory-header">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {items.map((item, index) => (
          <div key={index} className="inventory-row">
            <img src={`${url}/image/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p className="remove-action" onClick={() => removeItem(item._id)}>
              ✖
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
