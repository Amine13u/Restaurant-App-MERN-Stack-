import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import Spinner from "../../components/Spinner";
import { getProducts } from "../../JS/actions/productActions";

const Menu = () => {
  const products = useSelector((state) => state.productReducer.products);
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  const dispatch = useDispatch();

  const isAdmin =
    useSelector((state) => state.authReducer.user.role) === "admin";
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   setToggle(false);
  // }, []);

  const [toggle, setToggle] = useState(false);

  const handleAdd = () => {
    setToggle(!toggle);
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="menu-list">
        {products.map((product) => (
          <ProductCard product={product} key={Math.random()} />
        ))}
      </div>
      {isAdmin && (
        <Fragment>
          <button className="add-btn" onClick={handleAdd}>
            +
          </button>
          {toggle && <ProductForm onClick={() => handleAdd()} />}
        </Fragment>
      )}
      {isAuth && !isAdmin && (
        <Link to="/cart">
          <button className="add-btn">
            <i className="fas fa-shopping-cart"></i>
          </button>
        </Link>
      )}
    </Fragment>
  );
};

export default Menu;
