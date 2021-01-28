import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ORDER } from "../../JS/const";
// import * as R from "ramda";
import CartItem from "./CartItem";
import { createOrder } from "../../JS/actions/orderActions";

const OrdersCard = () => {
  // const orders = R.uniqWith(R.eqProps, products);
  const products = useSelector((state) => state.productReducer.productOrdred);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let price = 0;

    products.forEach((item) => {
      price += item.qty * item.price;
    });

    setTotal(price);
  }, [products, total, setTotal]);

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch({
      type: CLEAR_ORDER,
    });
  };

  const handleConfirm = () => {
    dispatch(
      createOrder({
        products: products.map((obj) => ({
          product: obj._id,
          quantity: obj.qty,
        })),
        totalPrice: total,
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
          // setTotal={setTotal}
          // total={total}
        />
      ))}

      <h3>Total : {total} $</h3>
      {/* {" "}
        {
          (products.length === 0
            ? 0
            : products.reduce((total, prod) => total + prod.price),
          0)
        }{" "}
        $
       */}
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
