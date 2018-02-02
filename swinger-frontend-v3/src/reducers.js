import { combineReducers } from "redux";

import {
  FETCH_USER,
  FETCH_USERS,
  FETCH_SHOW,
  FETCH_AUTH,
  LOGOUT
} from "./actions/types";

const initialState = { users: [], currentUser: {} };
const initialUser = {
  username: "Kat",
  shows: [{ name: "Gypsy" }, { name: "A Chorus Line" }]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user;
    default:
      return state;
  }
};

const showReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SHOW:
      return action.show;
    default:
      return state;
  }
};

const authReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case FETCH_AUTH:
      console.log("in reducer", action.auth);
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
