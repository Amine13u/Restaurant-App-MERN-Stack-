import React, { Fragment } from "react";
import "./style.css";

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="not-Found">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="form">Sorry, This page does not exist</p>
    </Fragment>
  );
};

export default NotFound;
