import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  RATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  ADD_COMMENT,
  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT,
} from "../const";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/product");

    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const rateProduct = (productID, rate) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  // to fix
  const body = {
    value: 2 * rate,
  };

  try {
    const { data } = await axios.post(
      `/api/product/rate/${productID}`,
      body,
      options
    );

    dispatch({
      type: RATE_PRODUCT,
      payload: { productID, rate: data },
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const deleteProduct = (productID) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.delete(`/api/product/${productID}`, options);

    dispatch({
      type: DELETE_PRODUCT,
      payload: { productID, rate: data },
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.post("/api/product", formData, options);

    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const updateProduct = (formData, productID) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.post(
      `/api/product/${productID}`,
      formData,
      options
    );

    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const addComment = (text, productID) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.post(
      `api/product/comment/${productID}`,
      text,
      options
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { productID, comment: data },
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

// export const deleteComment = (commentID, productID) => async (dispatch) => {
//   const options = {
//     headers: {
//       authorization: localStorage.getItem("token"),
//     },
//   };

//   try {
//     await axios.delete(
//       `api/product/comment/${productID}/${commentID}`,
//       options
//     );

//     dispatch({
//       type: DELETE_COMMENT,
//       payload: commentID,
//     });
//   } catch (err) {
//     dispatch({
//       type: PRODUCT_ERROR,
//     });
//   }
// };

export const addProductToCart = (productID) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/product");

    const product = data.filter((prod) => prod._id === productID);

    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};
