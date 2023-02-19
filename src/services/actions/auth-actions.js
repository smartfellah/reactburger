import { dataURL } from "../../utils/endpoint";
import { apiRequest } from "../../utils/api-request";
import {
  clearTokenCookies,
  getCookie,
  refreshAccessAndContinue,
  setCookie,
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

export function getUserRequestAction(actionTypeString, userData) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(getUser)GET_USER_REQUEST",
      };
    case "error":
      return {
        type: "(getUser)GET_USER_ERROR",
      };
    case "success":
      return {
        type: "(getUser)GET_USER_SUCCESS",
        payload: userData,
      };
    default:
      return {
        type: "(getUser)GET_USER_REQUEST",
      };
  }
}

export function patchUserRequestAction(actionTypeString, userData) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(patchUser)PATCH_USER_REQUEST",
      };
    case "error":
      return {
        type: "(patchUser)PATCH_USER_ERROR",
      };
    case "success":
      return {
        type: "(patchUser)PATCH_USER_SUCCESS",
        payload: userData,
      };
    default:
      return {
        type: "(patchUser)PATCH_USER_REQUEST",
      };
  }
}

export function resetPasswordRequestAction(actionTypeString) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(resetPassword)RESET_PASSWORD_REQUEST",
      };
    case "error":
      return {
        type: "(resetPassword)RESET_PASSWORD_ERROR",
      };
    case "success":
      return {
        type: "(resetPassword)RESET_PASSWORD_SUCCESS",
      };
    default:
      return {
        type: "(resetPassword)RESET_PASSWORD_REQUEST",
      };
  }
}

export function forgotPasswordRequestAction(actionTypeString) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(forgotPassword)FORGOT_PASSWORD_REQUEST",
      };
    case "error":
      return {
        type: "(forgotPassword)FORGOT_PASSWORD_ERROR",
      };
    case "success":
      return {
        type: "(forgotPassword)FORGOT_PASSWORD_SUCCESS",
      };
    default:
      return {
        type: "(forgotPassword)FORGOT_PASSWORD_REQUEST",
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

      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);

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

      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);

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

      localStorage.removeItem("name");
      localStorage.removeItem("email");

      dispatch(logoutRequestAction("success"));
      clearTokenCookies();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.name);
      dispatch(logoutRequestAction("error"));
    }
  };
}

export function sendGetUserRequest(navigate) {
  return async function getUserRequestThunk(dispatch) {
    dispatch(getUserRequestAction());

    try {
      const response = await apiRequest(`${dataURL}/auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      dispatch(getUserRequestAction("success", response.user));
    } catch (error) {
      if (error === 403)
        refreshAccessAndContinue(dispatch, sendPatchUserRequest, navigate);
      dispatch(getUserRequestAction("error"));
    }
  };
}

export function sendPatchUserRequest(infoToPatch, navigate) {
  return async function patchUserRequestThunk(dispatch) {
    dispatch(patchUserRequestAction());

    let response;
    try {
      response = await apiRequest(`${dataURL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(infoToPatch),
      });
      dispatch(patchUserRequestAction("success", response.user));
    } catch (error) {
      if (error === 403)
        refreshAccessAndContinue(
          dispatch,
          sendPatchUserRequest,
          navigate,
          infoToPatch
        );
      dispatch(patchUserRequestAction("error"));
    }
  };
}

export function checkUserAuth() {
  return async function checkUserAuthThunk(dispatch) {
    let response;
    dispatch(getUserRequestAction());
    try {
      response = await apiRequest(`${dataURL}/auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      dispatch(getUserRequestAction("success", response.user));
    } catch (error) {
      console.log("checkUserAuthError");
      try {
        const innerResponse = await apiRequest(`${dataURL}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: getCookie("refreshToken") }),
        });
        setTokenCookies(innerResponse);
      } catch (error) {
        if (error === 401) console.log("401 Unauthorized");
        dispatch(getUserRequestAction("error"));
      }
    }
  };
}

export function sendResetPasswordRequest(resetCode, newPassword, navigate) {
  return async function resetPasswordRequestThunk(dispatch) {
    dispatch(resetPasswordRequestAction());

    try {
      await apiRequest(`${dataURL}/password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword, token: resetCode }),
      });
      dispatch(resetPasswordRequestAction("success"));
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error.name);
      dispatch(resetPasswordRequestAction("error"));
    }
  };
}

export function sendForgotPasswordRequest(email, navigate) {
  return async function (dispatch) {
    dispatch(forgotPasswordRequestAction());

    try {
      await apiRequest(`${dataURL}/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      dispatch(forgotPasswordRequestAction("success"));
      navigate("/reset-password", { state: { fromForgot: true } });
    } catch (error) {
      console.log(error);
      dispatch(forgotPasswordRequestAction("error"));
    }
  };
}
