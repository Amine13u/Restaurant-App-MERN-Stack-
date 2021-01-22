import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../const";

const initialState = {
  profile: null,
  profiles: null,
  isLoading: true,
  error: {},
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case CLEAR_PROFILE:
      return { ...state, profile: null, isLoading: false };
    default:
      return state;
  }
};

export default profileReducer;
