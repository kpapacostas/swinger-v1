import { combineReducers } from "redux";
import { FETCH_SHOW, FETCH_AUTH, LOGOUT } from "./actions/types";

// const initialState = { users: [], currentUser: {} };

const showReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SHOW:
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentUser: authReducer,
  currentShow: showReducer
});

export default rootReducer;
