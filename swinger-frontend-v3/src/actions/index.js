import {
  FETCH_SHOW,
  FETCH_AUTH,
  LOGOUT,
  UPDATE_SHOWS,
  CREATE_SHOW,
  DELETE_SHOW
} from "./types";
import {
  fetchCurrentUser,
  fetchShow,
  getAuth,
  editShow,
  createShow,
  destroyShow
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
      console.log("in update show", resp);
      dispatch({ type: UPDATE_SHOWS, show: resp });
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
      dispatch({ type: DELETE_SHOW });
    });
  };
};
