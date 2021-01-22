import axios from "axios";
import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  AUTH_FAIL,
  SET_LOADING,
  LOGOUT,
  GET_AUTH_USER,
  CLEAR_PROFILE,
} from "../const";

export const register = (formData) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  try {
    const { data } = await axios.post("/api/auth/register", formData);
    localStorage.setItem("token", data.token);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const res = err.response.data;
    if (Array.isArray(res)) {
      res.forEach((err) => {
        alert(err.msg);
      });
    }

    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  try {
    const { data } = await axios.post("/api/auth/login", formData);
    localStorage.setItem("token", data.token);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const res = err.response.data;
    if (Array.isArray(res)) {
      res.forEach((err) => {
        alert(err.msg);
      });
    }

    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: CLEAR_PROFILE,
  });

  dispatch({
    type: LOGOUT,
  });
};

export const getAuthUser = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.get("/api/auth/me", options);
    if (!data.user) {
      dispatch({
        type: AUTH_FAIL,
      });
    } else {
      dispatch({
        type: GET_AUTH_USER,
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};
