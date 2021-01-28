import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  RATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  ADD_COMMENT,
  ADD_PRODUCT_TO_CART,
  CLEAR_ORDER,
  UPDATE_PRODUCT,
  REMOVE_FROM_CART,
  ADJUST_ITEM_QTY,
} from "../const";

const initialState = {
  productOrdred: [],
  products: [],
  isLoading: true,
  error: {},
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== payload._id
        ),
        isLoading: false,
      };
    case RATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id
            ? { ...product, rate: payload.rate }
            : product
        ),
        isLoading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],

        isLoading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id ? payload : product
        ),
        isLoading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload._id
            ? { ...product, comment: payload.comment }
            : product
        ),
        isLoading: false,
      };
    case ADD_PRODUCT_TO_CART:
      // Get Item data from products array
      const product = state.products.find(
        (product) => product._id === payload.id
      );
      // Check if Item is in cart already
      const inCart = state.productOrdred.find((product) =>
        product._id === payload.id ? true : false
      );
      return {
        ...state,
        productOrdred: inCart
          ? state.productOrdred.map((product) =>
              product._id === payload.id
                ? { ...product, qty: product.qty + 1 }
                : product
            )
          : [...state.productOrdred, { ...product, qty: 1 }],

        isLoading: false,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        productOrdred: state.productOrdred.filter(
          (product) => product._id !== payload.id
        ),
        isLoading: false,
      };
    case ADJUST_ITEM_QTY:
      return {
        ...state,
        productOrdred: state.productOrdred.map((product) =>
          product._id === payload.id
            ? { ...product, qty: +payload.qty }
            : product
        ),
        isLoading: false,
      };
    case CLEAR_ORDER:
      return {
        ...state,
        productOrdred: [],
        isLoading: false,
      };
    // case DELETE_COMMENT:
    //   return {
    //     ...state,
    //     products: state.products.map((product) =>
    //       product._id === payload.productID
    //         ? {
    //             ...product,
    //             comment: state.product.comment.filter(
    //               (com) => com._id !== payload
    //             ),
    //           }
    //         : product
    //     ),
    //     isLoading: false,
    //   };
    default:
      return state;
  }
};

export default productReducer;
