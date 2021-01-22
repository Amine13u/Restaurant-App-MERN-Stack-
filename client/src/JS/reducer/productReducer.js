import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  RATE_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  ADD_COMMENT,
  ADD_PRODUCT_TO_CART,
  CLEAR_ORDER,
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
          (product) => product._id !== payload.productID
        ),
        isLoading: false,
      };
    case RATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload.productID
            ? { ...product, rate: payload.rate }
            : product
        ),
        isLoading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        // products: [...state.products, payload],
        products: state.products
          .filter((product) => product._id !== payload._id)
          .concat(payload),
        isLoading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload.productID
            ? { ...product, comment: payload.comment }
            : product
        ),
        isLoading: false,
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        productOrdred: state.productOrdred.concat(payload),
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
