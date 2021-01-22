import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  SET_LOADING,
  LOGOUT,
  GET_AUTH_USER,
  DELETE_ACCOUNT,
} from "../const";

const initialState = {
  token: null,
  user: {},
  isLoading: false,
  isAuth: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        user: payload.user,
      };

    case GET_AUTH_USER:
      return { ...state, isAuth: true, isLoading: false, user: payload.user };

    case AUTH_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
