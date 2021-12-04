import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_FAILED,
    });
  }
};
export const register =
  ({ name, email, password, history }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
    });
    try {
      await axios.post("/api/users", body, config);
      dispatch(
        setAlert(
          "User Registered Successfully,check your mail for verification token",
          "success"
        )
      );
      history.push("/verify");
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    let res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const verify = (email, token, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    token,
  });
  try {
    let res = await axios.post("/api/users/verify", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout
export const logOut = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};

export const reset = (token, password, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    password,
    token,
  });
  try {
    let res = await axios.post("/api/users/reset", body, config);
    dispatch(setAlert(res.data.msg, "success"));
    history.push("/login");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const forgot = (email, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
  });
  try {
    let res = await axios.post("/api/users/forgot", body, config);
    console.log(res);
    dispatch(setAlert(res.data.msg, "success"));
    history.push("/reset");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
