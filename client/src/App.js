import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Order from "./components/Order";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import OrdersCard from "./components/Order/OrdersCard";
import { getAuthUser } from "./JS/actions/authActions";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  useEffect(() => dispatch(getAuthUser()), [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Profile} />
        <PrivateRoute path="/orders" component={Order} />
        <PrivateRoute path="/cart" component={OrdersCard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
