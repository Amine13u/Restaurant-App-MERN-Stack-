import axios from "axios";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  DELETE_ACCOUNT,
} from "../const";

export const getCurrentProfile = () => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const { data } = await axios.get("/api/profile/me", options);

    dispatch({
      type: GET_PROFILE,
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
      type: PROFILE_ERROR,
    });
  }
};

export const createProfile = (formData) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const { data } = await axios.post("/api/profile", formData, options);

    dispatch({
      type: GET_PROFILE,
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
      type: PROFILE_ERROR,
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  if (window.confirm("Are you sure ?")) {
    try {
      await axios.delete("/api/profile", options);
      localStorage.removeItem("token");

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      alert("Account deleted");
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  }
};
