import { combineReducers } from "redux";
import {
  FETCH_SHOW,
  FETCH_AUTH,
  LOGOUT,
  UPDATE_SHOWS,
  CREATE_SHOW,
  DELETE_SHOW,
  DELETE_ROLE
} from "./actions/types";

const showReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SHOW:
      return action.show.show;
    case CREATE_SHOW:
      return action.show.show;
    case DELETE_SHOW:
      return null;
    case DELETE_ROLE:
      return action.show.show;
    default:
      return state;
  }
};

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return action.auth;
    case LOGOUT:
      return {};
    case UPDATE_SHOWS:
      return action.user.user;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentUser: authReducer,
  currentShow: showReducer
});

export default rootReducer;
