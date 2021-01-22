import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../JS/actions/productActions";

const ProductForm = ({ onClick }) => {
  const dispatch = useDispatch();

  const [formData, setForm] = useState({
    name: "",
    price: 0,
  });

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData));
    setForm({
      name: "",
      price: 0,
    });
    onClick();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="container">
        <label>
          <b>Product Name</b>
        </label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter Product Name"
          name="name"
          id="name"
          required
        />

        <label>
          <b>Price</b>
        </label>
        <input
          onChange={handleChange}
          type="number"
          placeholder="Enter Price"
          name="price"
          id="price"
          required
        />
        <hr />

        <button type="submit" className="registerbtn">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
