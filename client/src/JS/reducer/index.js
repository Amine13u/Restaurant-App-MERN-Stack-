import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  authReducer,
  profileReducer,
  productReducer,
  orderReducer,
});

export default rootReducer;
