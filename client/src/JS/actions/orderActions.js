import axios from "axios";
import {
  GET_ORDERS,
  ORDER_ERROR,
  GET_USER_ORDERS,
  CREATE_ORDER,
} from "../const";

export const getOrders = () => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.get("/api/order", options);

    dispatch({
      type: GET_ORDERS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};

export const getUserOrders = (userID) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.get(`/api/order/${userID}`, options);

    if (data.length === 0) {
      dispatch({
        type: ORDER_ERROR,
      });
    } else {
      dispatch({
        type: GET_USER_ORDERS,
        payload: data,
      });
    }
  } catch (err) {
    const res = err.response.data;
    if (Array.isArray(res)) {
      res.forEach((err) => {
        alert(err.msg);
      });
    }

    dispatch({
      type: ORDER_ERROR,
    });
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    await axios.post(`/api/order/`, orderData, options);

    dispatch({
      type: CREATE_ORDER,
    });

    alert("Order Created With Success");
  } catch (err) {
    const res = err.response.data;
    if (Array.isArray(res)) {
      res.forEach((err) => {
        alert(err.msg);
      });
    }

    dispatch({
      type: ORDER_ERROR,
    });
  }
};
