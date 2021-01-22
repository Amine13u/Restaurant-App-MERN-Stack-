import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import OrderCard from "./OrderCard";
import { getOrders, getUserOrders } from "../../JS/actions/orderActions";

const Order = () => {
  const isLoading = useSelector((state) => state.orderReducer.isLoading);
  const orders = useSelector((state) => state.orderReducer.orders);
  const userID = useSelector((state) => state.authReducer.user._id);
  const isAdmin =
    useSelector((state) => state.authReducer.user.role) === "admin";
  const dispatch = useDispatch();

  if (isAdmin) {
  }

  useEffect(() => {
    if (isAdmin) {
      dispatch(getOrders());
    } else {
      dispatch(getUserOrders(userID));
    }
  }, [dispatch, isAdmin, userID]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {orders.length === 0 && (
        <h1 className="no-order">Sorry, there is no orders yet for you</h1>
      )}
      <div className="order-continer">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} isAdmin={isAdmin} />
        ))}
      </div>
    </Fragment>
  );
};

export default Order;
