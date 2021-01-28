import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adjustItemQty, removeFromCart } from "../../JS/actions/productActions";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.qty);

  if (quantity === 0) {
    dispatch(removeFromCart(product._id));
  }

  const handleUpdate = (e) => {
    setQuantity(e.target.value);

    dispatch(adjustItemQty(product._id, e.target.value));
  };

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div className="cart-item">
      <h3>{capitalize(product.name)}</h3>
      <h3>{product.price} $</h3>
      <input
        width="5"
        min="0"
        max="99"
        value={quantity}
        onChange={handleUpdate}
        type="number"
        name="quantity"
        id="quantity"
      />
      <h3 name="total">{product.price * quantity} $</h3>
    </div>
  );
};

export default CartItem;
