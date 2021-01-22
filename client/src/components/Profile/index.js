import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../JS/actions/profileActions";
import Spinner from "../../components/Spinner";
import { createProfile } from "../../JS/actions/profileActions";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.profileReducer.isLoading);
  const profile = useSelector((state) => state.profileReducer.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  const [formData, setFormData] = useState({
    address_1: "",
    address_2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData));
  };

  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 style={{ color: "gray" }}> Dashboard</h1>
      <h3 style={{ color: "gray" }}>
        Welcome{" "}
        {user && `${capitalize(user.firstName)} ${capitalize(user.lastName)}`}
      </h3>
      {profile !== null ? (
        <ProfileCard />
      ) : (
        <Fragment>
          <p>You haven't a profile yet, Please create one.</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="container">
              <p>Please fill in this form to Create your Profile.</p>
              <hr />

              <label>
                <b>Address 1</b>
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Address 1"
                name="address_1"
                id="address_1"
                required
              />

              <label>
                <b>Address 2</b>
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Address 2"
                name="address_2"
                id="address_2"
              />
              <hr />

              <button type="submit" className="registerbtn">
                Create Profile
              </button>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
