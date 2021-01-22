import React, { useState } from "react";

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleUpdate = (e) => {
    setQuantity(e.target.value);
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
