import { combineReducers } from "redux";
import {
  FETCH_SHOW,
  FETCH_AUTH,
  LOGOUT,
  UPDATE_SHOWS,
  CREATE_SHOW,
  DELETE_SHOW,
  DELETE_ROLE,
  SLIDE_VIEW,
  CHANGE_ROLE,
  CHANGE_SCENE,
  FETCH_SCENE,
  FETCH_SLIDE,
} from "./actions/types";

const showReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SHOW:
      return action.show;
    case CREATE_SHOW:
      return action.show.show;
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
    case DELETE_SHOW:
      return action.user;
    case UPDATE_SHOWS:
      return action.user.user;
    default:
      return state;
  }
};

const slideViewReducer = (state = false, action) => {
  switch (action.type) {
    case SLIDE_VIEW:
      return !state;
    default:
      return state;
  }
};

const roleReducer = (state = null, action) => {
  switch (action.type) {
    case CHANGE_ROLE:
      console.log("role reducer", action.role);
      return action.role;
    default:
      return state;
  }
};

const sceneReducer = (state = null, action) => {
  switch (action.type) {
    case CHANGE_SCENE:
      return action.scene;
    case FETCH_SCENE:
      return action.scene;
    default:
      return state;
  }
};

const slideReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SLIDE:
      return action.slide;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentUser: authReducer,
  currentShow: showReducer,
  currentRole: roleReducer,
  currentScene: sceneReducer,
  currentSlide: slideReducer,
  slideView: slideViewReducer,
});
export default rootReducer;
