import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, deleteAccount } from "../../JS/actions/profileActions";

import "./style.css";

const ProfileCard = () => {
  const profilestate = useSelector((state) => state.profileReducer.profile);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);

  const [formData, setFormData] = useState({
    address_1: profilestate.address_1,
    address_2: profilestate.address_2,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData));
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
    setFormData({
      address_1: profilestate.address_1,
      address_2: profilestate.address_2,
    });
  };

  return (
    <Fragment>
      <div className="profile-card">
        <p
          data-letters={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
        ></p>
        {user.role === "admin" && (
          <h4>
            <b>Admin</b>
          </h4>
        )}
        <h3>
          <i className="fas fa-at"></i> E-mail : {user.email}
        </h3>
        {user.role !== "admin" && (
          <Fragment>
            <h3>
              <i className="fas fa-map-marker-alt"></i> ADDRESS 1 :{" "}
              {profilestate.address_1}
            </h3>
            {profilestate.address_2 && (
              <h3>
                <i className="fas fa-map-marker-alt"></i> ADDRESS 2 :{" "}
                {profilestate.address_2}
              </h3>
            )}
            <button onClick={handleToggle} className="profile-btn">
              Update Profile
            </button>
            <button
              className="profile-btn"
              onClick={() => dispatch(deleteAccount())}
            >
              Delete Account
            </button>
          </Fragment>
        )}
      </div>
      {toggle && (
        <form
          className="form"
          style={{ marginTop: "50px" }}
          onSubmit={handleSubmit}
        >
          <div className="container">
            <label>
              <b>Address 1</b>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="address_1"
              value={formData.address_1}
              id="address_1"
              required
            />

            <label>
              <b>Address 2</b>
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={formData.address_2}
              name="address_2"
              id="address_2"
            />
            <hr />

            <button type="submit" className="registerbtn">
              Update
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default ProfileCard;
