import {
  FETCH_SHOW,
  FETCH_AUTH,
  LOGOUT,
  UPDATE_SHOWS,
  CREATE_SHOW,
  DELETE_SHOW,
  DELETE_ROLE,
  CHANGE_ROLE,
  SLIDE_VIEW,
  CHANGE_SCENE,
  FETCH_SCENE,
  FETCH_SLIDE
} from "./types";
import {
  fetchCurrentUser,
  fetchShow,
  getAuth,
  editShow,
  createShow,
  destroyShow,
  destroyRole,
  fetchRole,
  editSlide,
  fetchScene,
  fetchSlide
} from "../adapters";

export const fetchUser = dispatch => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });

    fetchCurrentUser().then(data => {
      dispatch({ type: FETCH_AUTH, auth: data });
    });
  };
};

export const fetchCurrentShow = (dispatch, showName) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    fetchShow(showName).then(data => {
      dispatch({ type: FETCH_SHOW, show: data });
    });
  };
};

export const fetchCurrentScene = (dispatch, sceneId) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    fetchScene(sceneId).then(data => {
      dispatch({ type: FETCH_SCENE, scene: data });
    });
  };
};

export const fetchCurrentSlide = (dispatch, slideId) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    fetchSlide(slideId).then(data => {
      dispatch({ type: FETCH_SLIDE, slide: data });
    });
  };
};

export const logIn = (dispatch, data, history) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });

    getAuth(data).then(json => {
      if (json.error) {
        alert("User is invalid, try again!");
        history.push("/");
      } else {
        localStorage.setItem("token", json.jwt);
        dispatch({ type: FETCH_AUTH, auth: json.user });
        history.push("/home");
      }
    });
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};

export const updateShow = (dispatch, data) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    editShow(data).then(resp => {
      dispatch({ type: UPDATE_SHOWS, user: resp });
    });
  };
};

export const createNewShow = (dispatch, data) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    createShow(data).then(resp => {
      dispatch({ type: CREATE_SHOW, show: resp });
    });
  };
};

export const deleteShow = (dispatch, id) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    destroyShow(id).then(resp => {
      dispatch({ type: DELETE_SHOW, user: resp });
    });
  };
};

export const deleteRole = (dispatch, id) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });
    destroyRole(id).then(resp => {
      dispatch({ type: DELETE_ROLE, show: resp });
    });
  };
};

export const changeRole = (dispatch, id) => {
  console.log("in chageRole actions", id);
  return dispatch => {
    dispatch({ type: "ASYNC_START" });

    fetchRole(id).then(resp => {
      dispatch({ type: CHANGE_ROLE, role: resp });
    });
  };
};

export const updateSlide = (dispatch, data) => {
  return dispatch => {
    dispatch({ type: "ASYNC_START" });

    editSlide(data).then(resp => {
      dispatch({ type: CHANGE_ROLE, role: resp });
    });
  };
};

export const slideView = () => {
  return { type: SLIDE_VIEW };
};

export const currentScene = data => {
  return { type: CHANGE_SCENE, scene: data };
};
