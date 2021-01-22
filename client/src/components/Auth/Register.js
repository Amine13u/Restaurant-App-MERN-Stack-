import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../JS/actions/authActions";
import "./style.css";

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    history.push("/dashboard");
  };

  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label>
            <b>First Name</b>
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            id="firstName"
            required
          />

          <label>
            <b>Last Name</b>
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            id="lastName"
            required
          />

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
            Register
          </button>
        </div>

        <div className="container signin">
          <p>
            Already have an account ? <Link to="/login"> Sign In</Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
