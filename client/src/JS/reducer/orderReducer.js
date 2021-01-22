import { GET_ORDERS, ORDER_ERROR, GET_USER_ORDERS } from "../const";

const initialState = {
  order: null,
  orders: [],
  isLoading: true,
  error: {},
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
    case GET_USER_ORDERS:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };

    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
