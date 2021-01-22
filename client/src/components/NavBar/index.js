import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../JS/actions/authActions";

import "./style.css";

const NavBar = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch();

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Sign In</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/dashboard">Profile</Link>
      </li>
      <li>
        <Link to="/orders">Order</Link>
      </li>
      <li>
        <Link onClick={() => dispatch(logout())} to="/">
          Sign Out
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className="header">
      <Link to="/">
        <h3 style={{ color: "black" }}>
          <i className="fas fa-utensils"></i> Restaurant App
        </h3>
      </Link>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          {isAuth ? authLinks : guestLinks}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
