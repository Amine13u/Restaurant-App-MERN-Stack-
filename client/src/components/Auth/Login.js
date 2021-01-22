import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/actions/authActions";
import "./style.css";

const Login = ({ history }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    history.push("/dashboard");
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Sign In</h1>
          <p>Please fill in this form to Sign In.</p>
          <hr />

          <label>
            <b>Email</b>
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            required
          />

          <label>
            <b>Password</b>
          </label>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
          />
          <hr />

          <button type="submit" className="registerbtn">
            Sign In
          </button>
        </div>

        <div className="container signin">
          <p>
            Haven't an account yet ? <Link to="/register"> Sign Up</Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
