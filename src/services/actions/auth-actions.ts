//API
import { dataURL } from "../../utils/endpoint";
import { apiRequest, checkSuccess } from "../../utils/api-request";
import {
  clearTokenCookies,
  getCookie,
  refreshAccessAndContinue,
  setTokenCookies,
} from "../../utils/cookie";
import { Dispatch } from "redux";
import { AppThunk } from "./types";

type TActionTypeString = "request" | "error" | "success";
export type TUserInfo = {
  email: string;
  name: string;
};
export type TAuthActions =
  | TRegisterActions
  | TLoginActions
  | TLogoutActions
  | TGetUserActions
  | TPatchUserActions
  | TResetPasswordActions
  | TForgotPasswordActions;

//Register type constants
export const REGISTER_REQUEST: "(register)AUTH_REQUEST" =
  "(register)AUTH_REQUEST";
export const REGISTER_SUCCESS: "(register)AUTH_SUCCESS" =
  "(register)AUTH_SUCCESS";
export const REGISTER_ERROR: "(register)AUTH_ERROR" = "(register)AUTH_ERROR";
//Register Actions-----------------------------------------------------------------------------------------
type TRegisterActions =
  | {
      readonly type: "(register)AUTH_REQUEST";
    }
  | {
      readonly type: "(register)AUTH_ERROR";
    }
  | {
      readonly type: "(register)AUTH_SUCCESS";
      readonly payload?: TUserInfo;
    };
export function registerRequestAction(
  actionTypeString?: TActionTypeString,
  userInfo?: TUserInfo
): TRegisterActions {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(register)AUTH_REQUEST",
      };
    case "error":
      return {
        type: "(register)AUTH_ERROR",
      };
    case "success":
      return {
        type: "(register)AUTH_SUCCESS",
        payload: userInfo,
      };
    default:
      return {
        type: "(register)AUTH_REQUEST",
      };
  }
}

//Login type constants
export const LOGIN_REQUEST: "(login)AUTH_REQUEST" = "(login)AUTH_REQUEST";
export const LOGIN_SUCCESS: "(login)AUTH_SUCCESS" = "(login)AUTH_SUCCESS";
export const LOGIN_ERROR: "(login)AUTH_ERROR" = "(login)AUTH_ERROR";
//Login Actions-----------------------------------------------------------------------------------------
type TLoginActions =
  | {
      readonly type: "(login)AUTH_REQUEST";
    }
  | {
      readonly type: "(login)AUTH_ERROR";
    }
  | {
      readonly type: "(login)AUTH_SUCCESS";
      readonly payload?: TUserInfo;
    };
export function loginRequestAction(
  actionTypeString?: TActionTypeString,
  userInfo?: TUserInfo
): TLoginActions {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(login)AUTH_REQUEST",
      };
    case "error":
      return {
        type: "(login)AUTH_ERROR",
      };
    case "success":
      return {
        type: "(login)AUTH_SUCCESS",
        payload: userInfo,
      };
    default:
      return {
        type: "(login)AUTH_REQUEST",
      };
  }
}
//Logout type constants
export const LOGOUT_REQUEST: "(logout)LOGOUT_REQUEST" =
  "(logout)LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "(logout)LOGOUT_SUCCESS" =
  "(logout)LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "(logout)LOGOUT_ERROR" = "(logout)LOGOUT_ERROR";
//Logout Actions-----------------------------------------------------------------------------------------
type TLogoutActions =
  | {
      readonly type: "(logout)LOGOUT_REQUEST";
    }
  | {
      readonly type: "(logout)LOGOUT_ERROR";
    }
  | {
      readonly type: "(logout)LOGOUT_SUCCESS";
    };
export function logoutRequestAction(
  actionTypeString?: TActionTypeString
): TLogoutActions {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(logout)LOGOUT_REQUEST",
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

//GetUser type constants
export const GET_USER_REQUEST: "(getUser)GET_USER_REQUEST" =
  "(getUser)GET_USER_REQUEST";
export const GET_USER_SUCCESS: "(getUser)GET_USER_SUCCESS" =
  "(getUser)GET_USER_SUCCESS";
export const GET_USER_ERROR: "(getUser)GET_USER_ERROR" =
  "(getUser)GET_USER_ERROR";
//GetUser Actions-----------------------------------------------------------------------------------------
type TGetUserActions =
  | {
      readonly type: "(getUser)GET_USER_REQUEST";
    }
  | {
      readonly type: "(getUser)GET_USER_ERROR";
    }
  | {
      readonly type: "(getUser)GET_USER_SUCCESS";
      readonly payload?: TUserInfo;
    };
export function getUserRequestAction(
  actionTypeString?: TActionTypeString,
  userData?: TUserInfo
): TGetUserActions {
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

//PatchUser type constants
export const PATCH_USER_REQUEST: "(patchUser)PATCH_USER_REQUEST" =
  "(patchUser)PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "(patchUser)PATCH_USER_SUCCESS" =
  "(patchUser)PATCH_USER_SUCCESS";
export const PATCH_USER_ERROR: "(patchUser)PATCH_USER_ERROR" =
  "(patchUser)PATCH_USER_ERROR";
//PatchUser Actions-----------------------------------------------------------------------------------------
type TPatchUserActions =
  | {
      readonly type: "(patchUser)PATCH_USER_REQUEST";
    }
  | {
      readonly type: "(patchUser)PATCH_USER_ERROR";
    }
  | {
      readonly type: "(patchUser)PATCH_USER_SUCCESS";
      readonly payload?: TUserInfo;
    };
export function patchUserRequestAction(
  actionTypeString?: TActionTypeString,
  userData?: TUserInfo
): TPatchUserActions {
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

//ResetPassword type constants
export const RESET_PASSWORD_REQUEST: "(resetPassword)RESET_PASSWORD_REQUEST" =
  "(resetPassword)RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "(resetPassword)RESET_PASSWORD_SUCCESS" =
  "(resetPassword)RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "(resetPassword)RESET_PASSWORD_ERROR" =
  "(resetPassword)RESET_PASSWORD_ERROR";
//ResetPassword Actions-----------------------------------------------------------------------------------------
type TResetPasswordActions =
  | {
      readonly type: "(resetPassword)RESET_PASSWORD_REQUEST";
    }
  | {
      readonly type: "(resetPassword)RESET_PASSWORD_ERROR";
    }
  | {
      readonly type: "(resetPassword)RESET_PASSWORD_SUCCESS";
    };
export function resetPasswordRequestAction(
  actionTypeString?: TActionTypeString
): TResetPasswordActions {
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

export const FORGOT_PASSWORD_REQUEST: "(forgotPassword)FORGOT_PASSWORD_REQUEST" =
  "(forgotPassword)FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "(forgotPassword)FORGOT_PASSWORD_SUCCESS" =
  "(forgotPassword)FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: "(forgotPassword)FORGOT_PASSWORD_ERROR" =
  "(forgotPassword)FORGOT_PASSWORD_ERROR";
//ForgotPassword Actions-----------------------------------------------------------------------------------------
type TForgotPasswordActions =
  | {
      readonly type: "(forgotPassword)FORGOT_PASSWORD_REQUEST";
    }
  | {
      readonly type: "(forgotPassword)FORGOT_PASSWORD_ERROR";
    }
  | {
      readonly type: "(forgotPassword)FORGOT_PASSWORD_SUCCESS";
    };
export function forgotPasswordRequestAction(
  actionTypeString?: TActionTypeString
): TForgotPasswordActions {
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

type TRegisterRequestBody = {
  email: string;
  password: string;
  name: string;
};
type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export const sendRegisterRequest: AppThunk = (
  requestBody: TRegisterRequestBody
) => {
  return async function registerRequestThunk(dispatch: Dispatch) {
    dispatch(registerRequestAction());

    let response: TLoginResponse;

    try {
      response = await apiRequest<TLoginResponse>(`${dataURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...requestBody }),
      });
      checkSuccess(response);

      setTokenCookies(response);

      const userInfo = response.user;

      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);

      dispatch(registerRequestAction("success", userInfo));
    } catch (error) {
      dispatch(registerRequestAction("error"));
      console.log(error);
    }
  };
};

type TLoginRequestBody = {
  email: string;
  password: string;
  success: boolean;
};
export const sendLoginRequest: AppThunk = (requestBody: TLoginRequestBody) => {
  return async function loginRequestThunk(dispatch: Dispatch) {
    dispatch(loginRequestAction());

    try {
      const response = await apiRequest<TLoginResponse>(
        `${dataURL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...requestBody }),
        }
      );
      checkSuccess(response);

      setTokenCookies(response);

      const userInfo = response.user;

      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);

      dispatch(loginRequestAction("success", userInfo));
    } catch (error) {
      dispatch(loginRequestAction("error"));
      console.log(error);
    }
  };
};

type TLogoutResponse = {
  message: string;
  success: boolean;
};
export const sendLogoutRequest: AppThunk = () => {
  return async function logoutRequestThunk(dispatch: Dispatch) {
    dispatch(logoutRequestAction());

    try {
      const response = await apiRequest<TLogoutResponse>(
        `${dataURL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: getCookie("refreshToken") }),
        }
      );
      checkSuccess(response);

      localStorage.removeItem("name");
      localStorage.removeItem("email");

      dispatch(logoutRequestAction("success"));
      clearTokenCookies();
    } catch (error) {
      console.log(error);
      dispatch(logoutRequestAction("error"));
    }
  };
};

/*
export const sendGetUserRequest: AppThunk = (navigate) => {
  return async function getUserRequestThunk(dispatch: Dispatch) {
    dispatch(getUserRequestAction());

    try {
      const response: any = await apiRequest(`${dataURL}/auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      debugger;

      dispatch(getUserRequestAction("success", response.user));
    } catch (error) {
      if (error === 403 || 401)
        refreshAccessAndContinue(dispatch, sendPatchUserRequest, navigate);
      dispatch(getUserRequestAction("error"));
    }
  };
};
*/

type TUserResponse = {
  user: {
    email: string;
    name: string;
  };
  success: boolean;
};
export const sendPatchUserRequest: AppThunk = (
  infoToPatch: {
    name: string;
    email: string;
    password: string;
  },
  navigate: any
) => {
  return async function patchUserRequestThunk(dispatch: Dispatch) {
    dispatch(patchUserRequestAction());

    let response: TUserResponse;
    try {
      response = await apiRequest<TUserResponse>(`${dataURL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify(infoToPatch),
      });
      checkSuccess(response);
      dispatch(patchUserRequestAction("success", response.user));
    } catch (error) {
      if (error === 403 || 401)
        refreshAccessAndContinue(
          dispatch,
          sendPatchUserRequest,
          navigate,
          infoToPatch
        );
      dispatch(patchUserRequestAction("error"));
    }
  };
};

type TAuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
};
export const checkUserAuth: AppThunk = () => {
  return async function checkUserAuthThunk(dispatch: Dispatch) {
    let response: TUserResponse;
    dispatch(getUserRequestAction());
    try {
      response = await apiRequest<TUserResponse>(`${dataURL}/auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      checkSuccess(response);
      dispatch(getUserRequestAction("success", response.user));
    } catch (error) {
      try {
        const innerResponse = await apiRequest<TAuthTokenResponse>(
          `${dataURL}/auth/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: getCookie("refreshToken") }),
          }
        );
        checkSuccess(innerResponse);
        setTokenCookies(innerResponse);
      } catch (error) {
        if (error === 401) console.log("401 Unauthorized");
        dispatch(getUserRequestAction("error"));
      }
    }
  };
};

type TRestorePasswordResponse = {
  message: string;
  success: boolean;
};
export const sendResetPasswordRequest: AppThunk = (
  resetCode: string,
  newPassword: string,
  navigate: any
) => {
  return async function resetPasswordRequestThunk(dispatch: Dispatch) {
    dispatch(resetPasswordRequestAction());

    try {
      const response = await apiRequest<TRestorePasswordResponse>(
        `${dataURL}/password-reset/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword, token: resetCode }),
        }
      );
      checkSuccess(response);
      dispatch(resetPasswordRequestAction("success"));
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordRequestAction("error"));
    }
  };
};

export const sendForgotPasswordRequest: AppThunk = (
  email: string,
  navigate: any
) => {
  return async function (dispatch: Dispatch) {
    dispatch(forgotPasswordRequestAction());

    try {
      const response = await apiRequest<TRestorePasswordResponse>(
        `${dataURL}/password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      checkSuccess(response);

      dispatch(forgotPasswordRequestAction("success"));
      navigate("/reset-password", { state: { fromForgot: true } });
    } catch (error) {
      console.log(error);
      dispatch(forgotPasswordRequestAction("error"));
    }
  };
};
