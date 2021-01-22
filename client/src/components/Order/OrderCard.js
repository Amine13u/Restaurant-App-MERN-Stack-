import React from "react";
import "./style.css";

const OrderCard = ({ order, isAdmin }) => {
  return (
    <div className="order-card">
      {isAdmin && <h3>User_id : {order.user}</h3>}

      <h3>Date : {order.time.slice(0, 10)}</h3>
      <h3>Price : {order.totalPrice} $</h3>
    </div>
  );
};

export default OrderCard;
