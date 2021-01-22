import React from "react";

const Comments = ({ product }) => {
  return (
    <div className="comments">
      {product.comment.slice(0, 3).map((com) => (
        <h5 key={product._id}>
          <i>{com.text}</i>
        </h5>
      ))}
    </div>
  );
};

export default Comments;
