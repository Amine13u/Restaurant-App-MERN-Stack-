import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Spinner from "../../components/Spinner";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuth) {
    return <Redirect to="/login" />;
  } else {
    return <Route path={path} component={Component} {...rest} />;
  }
};

export default PrivateRoute;
