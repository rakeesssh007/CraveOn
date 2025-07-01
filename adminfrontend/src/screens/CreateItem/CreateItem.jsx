import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import "./CreateItem.css";
import { toast } from "react-toastify";

const CreateItem = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      toast(response.data.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="create-item-screen">
      <div className="create-form-container">
        <form onSubmit={handleSubmit} className="form-flex">
          <div className="form-group image-upload">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="form-group">
            <p>Product Name</p>
            <input
              value={data.name}
              onChange={handleInputChange}
              type="text"
              name="name"
              placeholder="Type here"
              required
            />
          </div>

          <div className="form-group">
            <p>Description</p>
            <textarea
              value={data.description}
              onChange={handleInputChange}
              name="description"
              rows="5"
              placeholder="Write something..."
              required
            ></textarea>
          </div>

          <div className="category-price-row">
            <div className="form-group category">
              <p>Category</p>
              <select
                value={data.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="form-group price">
              <p>Price</p>
              <input
                value={data.price}
                onChange={handleInputChange}
                type="number"
                name="price"
                placeholder="₹150"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
