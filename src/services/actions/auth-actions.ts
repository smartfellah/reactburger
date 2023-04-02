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
import { createAction } from "@reduxjs/toolkit";

export type TUserInfo = {
  email: string;
  name: string;
};

//Register actions
export const registerRequest = createAction("(register)AUTH_REQUEST");
export const registerSuccess = createAction<TUserInfo>(
  "(register)AUTH_SUCCESS"
);
export const registerError = createAction("(register)AUTH_ERROR");

//Login actions
export const loginRequest = createAction("(login)AUTH_REQUEST");
export const loginSuccess = createAction<TUserInfo>("(login)AUTH_SUCCESS");
export const loginError = createAction("(login)AUTH_ERROR");

//Logout type constants
export const logoutRequest = createAction("(logout)LOGOUT_REQUEST");
export const logoutSuccess = createAction("(logout)LOGOUT_SUCCESS");
export const logoutError = createAction("(logout)LOGOUT_ERROR");

//GetUser type constants
export const getUserRequest = createAction("(getUser)GET_USER_REQUEST");
export const getUserSuccess = createAction<TUserInfo>(
  "(getUser)GET_USER_SUCCESS"
);
export const getUserError = createAction("(getUser)GET_USER_ERROR");

//PatchUser type constants
export const patchUserRequest = createAction("(patchUser)PATCH_USER_REQUEST");
export const patchUserSuccess = createAction<TUserInfo>(
  "(patchUser)PATCH_USER_SUCCESS"
);
export const patchUserError = createAction("(patchUser)PATCH_USER_ERROR");

//ResetPassword type constants
export const resetPasswordRequest = createAction(
  "(resetPassword)RESET_PASSWORD_REQUEST"
);
export const resetPasswordSuccess = createAction(
  "(resetPassword)RESET_PASSWORD_SUCCESS"
);
export const resetPasswordError = createAction(
  "(resetPassword)RESET_PASSWORD_ERROR"
);

export const forgotPasswordRequest = createAction(
  "(forgotPassword)FORGOT_PASSWORD_REQUEST"
);
export const forgotPasswordSuccess = createAction(
  "(forgotPassword)FORGOT_PASSWORD_SUCCESS"
);
export const forgotPasswordError = createAction(
  "(forgotPassword)FORGOT_PASSWORD_ERROR"
);

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

export type TAuthActions =
  | ReturnType<typeof registerError>
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof loginError>
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logoutError>
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof getUserError>
  | ReturnType<typeof getUserRequest>
  | ReturnType<typeof getUserSuccess>
  | ReturnType<typeof patchUserError>
  | ReturnType<typeof patchUserRequest>
  | ReturnType<typeof patchUserSuccess>
  | ReturnType<typeof resetPasswordError>
  | ReturnType<typeof resetPasswordRequest>
  | ReturnType<typeof resetPasswordSuccess>
  | ReturnType<typeof forgotPasswordError>
  | ReturnType<typeof forgotPasswordRequest>
  | ReturnType<typeof forgotPasswordSuccess>;

export const sendRegisterRequest: AppThunk = (
  requestBody: TRegisterRequestBody
) => {
  return async function registerRequestThunk(dispatch: Dispatch) {
    dispatch(registerRequest());

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

      dispatch(registerSuccess(userInfo));
    } catch (error) {
      dispatch(registerError());
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
    dispatch(loginRequest());

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

      dispatch(loginSuccess(userInfo));
    } catch (error) {
      dispatch(loginError());
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
    dispatch(logoutRequest());

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

      dispatch(logoutSuccess());
      clearTokenCookies();
    } catch (error) {
      console.log(error);
      dispatch(logoutError());
    }
  };
};

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
    dispatch(patchUserRequest());

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
      dispatch(patchUserSuccess(response.user));
    } catch (error) {
      if (error === 403 || 401)
        refreshAccessAndContinue(
          dispatch,
          sendPatchUserRequest,
          navigate,
          infoToPatch
        );
      dispatch(patchUserError());
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
    dispatch(getUserRequest());
    try {
      response = await apiRequest<TUserResponse>(`${dataURL}/auth/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      checkSuccess(response);
      dispatch(getUserSuccess(response.user));
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
        dispatch(getUserError());
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
    dispatch(resetPasswordRequest());

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
      dispatch(resetPasswordSuccess());
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordError());
    }
  };
};

export const sendForgotPasswordRequest: AppThunk = (
  email: string,
  navigate: any
) => {
  return async function (dispatch: Dispatch) {
    dispatch(forgotPasswordRequest());

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

      dispatch(forgotPasswordSuccess());
      navigate("/reset-password", { state: { fromForgot: true } });
    } catch (error) {
      console.log(error);
      dispatch(forgotPasswordError());
    }
  };
};
