import { createStore } from "redux";
import rootReducer from "./reducers";
import { applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(reduxThunk));
};

export default configureStore;
