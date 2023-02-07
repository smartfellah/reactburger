import { dataURL } from "../../utils/endpoint";
import { apiRequest } from "../../utils/api-request";
import {
  clearTokenCookies,
  getCookie,
  setTokenCookies,
} from "../../utils/cookie/";

export function registerRequestAction(actionTypeString, userInfo) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(register)REGISTER_REQUEST",
      };
    case "error":
      return {
        type: "(register)REGISTER_ERROR",
      };
    case "success":
      return {
        type: "(register)REGISTER_SUCCESS",
        payload: userInfo,
      };
    default:
      return {
        type: "(register)REGISTER_REQUEST",
      };
  }
}

export function loginRequestAction(actionTypeString, userInfo) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(login)LOGIN_REQUEST",
      };
    case "error":
      return {
        type: "(login)LOGIN_ERROR",
      };
    case "success":
      return {
        type: "(login)LOGIN_SUCCESS",
        payload: userInfo,
      };
    default:
      return {
        type: "(login)LOGIN_REQUEST",
      };
  }
}

export function logoutRequestAction(actionTypeString) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(logout)LOGIN_REQUEST",
      };
    case "error":
      return {
        type: "(logout)LOGOUT_ERROR",
      };
    case "success":
      return {
        type: "(logout)LOGOUT_SUCCESS",
      };
    default:
      return {
        type: "(logout)LOGOUT_REQUEST",
      };
  }
}

export function sendRegisterRequest(requestBody, navigate) {
  return async function registerRequestThunk(dispatch) {
    dispatch(registerRequestAction());

    let response;

    try {
      response = await apiRequest(`${dataURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...requestBody }),
      });

      setTokenCookies(response);

      const userInfo = response.user;

      dispatch(registerRequestAction("success", userInfo));
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(registerRequestAction("error"));
      console.log(error.name);
    }
  };
}

export function sendLoginRequest(requestBody, navigate) {
  return async function loginRequestThunk(dispatch) {
    dispatch(loginRequestAction());

    try {
      const response = await apiRequest(`${dataURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...requestBody }),
      });

      setTokenCookies(response);

      const userInfo = response.user;

      dispatch(loginRequestAction("success", userInfo));
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(loginRequestAction("error"));
      console.log(error.name);
    }
  };
}

export function sendLogoutRequest(navigate) {
  return async function logoutRequestThunk(dispatch) {
    dispatch(logoutRequestAction());

    try {
      await apiRequest(`${dataURL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });

      dispatch(logoutRequestAction("success"));
      clearTokenCookies();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.name);
      dispatch(logoutRequestAction("error"));
    }
  };
}
