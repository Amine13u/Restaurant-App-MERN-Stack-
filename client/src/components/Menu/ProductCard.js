import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactRateComponent from "react-rate-component";
import {
  addProductToCart,
  createProduct,
} from "../../JS/actions/productActions";

import {
  rateProduct,
  deleteProduct,
  addComment,
} from "../../JS/actions/productActions";
import Comments from "./Comments";
import "./style.css";

const ProductCard = ({ product }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isAdmin =
    useSelector((state) => state.authReducer.user.role) === "admin";

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [formDataUpdate, setFormDataUpdate] = useState({
    name: "",
    price: 0,
  });

  const handleToggle = () => {
    setToggle(!toggle);
    setFormDataUpdate({
      name: product.name,
      price: product.price,
    });
  };

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  // to fix
  const handleChange = (rating) => {
    dispatch(rateProduct(product._id, rating));
  };

  const handleClick = () => {
    dispatch(deleteProduct(product._id));
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ text }, product._id));
    setText("");
  };

  const handleUpdate = (e) => {
    setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(formDataUpdate));
    // dispatch(getProducts());
    setFormDataUpdate({
      name: "",
      price: 0,
    });
    setToggle(false);
  };

  return (
    <Fragment>
      <div className="product-card">
        <img
          src={`/img/${product.name}.jpg`}
          alt={product.name}
          width="100%"
          height="150"
        ></img>
        <h2>{capitalize(product.name)} </h2>
        <h2>{product.price} $</h2>
        {!isAuth && (
          <Fragment>
            <ReactRateComponent
              defaultValue={
                product.rate.reduce((a, b) => a + b.value, 0) /
                  (2 * product.rate.length) +
                1
              }
              edit={false}
            />
            <Comments product={product} />
          </Fragment>
        )}
        {isAuth && !isAdmin && (
          <Fragment>
            <ReactRateComponent onChange={handleChange} />
            <button
              className="product-btn"
              onClick={() => dispatch(addProductToCart(product._id))}
            >
              Order now
            </button>
            <form>
              <textarea
                placeholder="Add a comment"
                onChange={(e) => setText(e.target.value)}
                value={text}
                required
              ></textarea>
              <button className="comment-btn" onClick={handleComment}>
                +
              </button>
            </form>
          </Fragment>
        )}

        {isAdmin && (
          <Fragment>
            <ReactRateComponent
              defaultValue={
                product.rate.reduce((a, b) => a + b.value, 0) /
                  (2 * product.rate.length) +
                1
              }
              edit={false}
            />
            <button className="admin-btn" onClick={handleToggle}>
              Update
            </button>
            <button className="admin-btn" onClick={handleClick}>
              Delete
            </button>
          </Fragment>
        )}
      </div>
      {toggle && (
        <Fragment>
          <form className="form" onSubmit={handleSubmit}>
            <div className="container">
              <label>
                <b>Product Name</b>
              </label>
              <input
                value={formDataUpdate.name}
                onChange={handleUpdate}
                type="text"
                name="name"
                id="name"
                required
              />

              <label>
                <b>Price</b>
              </label>
              <input
                value={formDataUpdate.price}
                onChange={handleUpdate}
                type="number"
                name="price"
                id="price"
                required
              />
              <hr />

              <button type="submit" className="registerbtn">
                Update
              </button>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductCard;
