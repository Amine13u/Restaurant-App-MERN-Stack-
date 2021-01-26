import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ORDER } from "../../JS/const";
// import * as R from "ramda";
import CartItem from "./CartItem";
import { createOrder } from "../../JS/actions/orderActions";

const OrdersCard = () => {
  const products = useSelector((state) => state.productReducer.productOrdred);
  // const orders = R.uniqWith(R.eqProps, products);

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const handleCancel = () => {
    dispatch({
      type: CLEAR_ORDER,
    });
  };

  const handleConfirm = () => {
    dispatch(
      createOrder({
        products: [
          { product: "5ff9dad34a55d00cc0118fd6", quantity: 10 },
          { product: "5ff9dad34a55d00cc0118fd6", quantity: 10 },
          { product: "5ff9dad34a55d00cc0118fd6", quantity: 10 },
        ],
        totalPrice: 390,
      })
    );
    dispatch({
      type: CLEAR_ORDER,
    });
  };

  return (
    <div className="cart">
      <h1>Orders Cart</h1>
      <div className="cart-item">
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
        <h3>Total</h3>
      </div>
      {products.map((product) => (
        <CartItem
          product={product}
          key={Math.random()}
          setTotal={setTotal}
          total={total}
        />
      ))}

      {/* <h3>
        Total :{" "}
        {
          (products.length === 0
            ? 0
            : products.reduce((total, prod) => total + prod.price),
          0)
        }{" "}
        $
      </h3> */}
      {products.length !== 0 ? (
        <Fragment>
          <button onClick={handleConfirm} className="profile-btn">
            Confirm
          </button>
          <button onClick={handleCancel} className="profile-btn">
            Cancel
          </button>
        </Fragment>
      ) : (
        <h1 className="no-order">The Cart is Empty, Order Now !!</h1>
      )}
    </div>
  );
};

export default OrdersCard;
