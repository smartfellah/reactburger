import { createReducer } from "@reduxjs/toolkit";
import {
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
  registerError,
  registerRequest,
  registerSuccess,
  patchUserError,
  patchUserRequest,
  patchUserSuccess,
  getUserError,
  getUserRequest,
  getUserSuccess,
  forgotPasswordError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  TUserInfo,
} from "../actions/auth-actions";

type TAuthReducerInitialState = {
  user: TUserInfo | null;
  requestPending: boolean;
  requestError: boolean;
  authChecked: boolean;
};

const initialState: TAuthReducerInitialState = {
  user: null,
  requestPending: false,
  requestError: false,
  authChecked: false,
};
export const authReducer = createReducer(initialState, (builder) => {
  builder
    //-----REGISTER-----------------------
    .addCase(registerRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(registerError, (state) => {
      state.requestPending = false;
      state.requestError = true;
      state.user = null;
    })
    .addCase(registerSuccess, (state, action) => {
      state.user = action.payload;
      state.requestError = false;
      state.requestPending = false;
    })

    //-----LOGIN-----------------------
    .addCase(loginRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(loginError, (state) => {
      state.requestPending = false;
      state.requestError = true;
      state.user = null;
    })
    .addCase(loginSuccess, (state, action) => {
      state.user = action.payload;
      state.requestError = false;
      state.requestPending = false;
    })

    //-----LOGOUT-----------------------
    .addCase(logoutRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(logoutError, (state) => {
      state.requestPending = false;
      state.requestError = true;
    })
    .addCase(logoutSuccess, (state) => {
      state.requestError = false;
      state.requestPending = false;
      state.user = null;
    })

    //----GET USER---------------------
    .addCase(getUserRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(getUserError, (state) => {
      state.requestPending = false;
      state.requestError = true;
      state.user = null;
      state.authChecked = true;
    })
    .addCase(getUserSuccess, (state, action) => {
      state.user = action.payload;
      state.requestError = false;
      state.requestPending = false;
      state.authChecked = true;
    })

    //------PATCH USER---------------------
    .addCase(patchUserRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(patchUserError, (state) => {
      state.requestPending = false;
      state.requestError = true;
      state.user = null;
    })
    .addCase(patchUserSuccess, (state, action) => {
      state.user = action.payload;
      state.requestError = false;
      state.requestPending = false;
    })

    //-----FORGOT PASSWORD-----------------------
    .addCase(forgotPasswordRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(forgotPasswordError, (state) => {
      state.requestPending = false;
      state.requestError = true;
    })
    .addCase(forgotPasswordSuccess, (state) => {
      state.requestError = false;
      state.requestPending = false;
    })

    //-----RESET PASSWORD-----------------------
    .addCase(resetPasswordRequest, (state) => {
      state.requestPending = true;
    })
    .addCase(resetPasswordError, (state) => {
      state.requestPending = false;
      state.requestError = true;
    })
    .addCase(resetPasswordSuccess, (state) => {
      state.requestError = false;
      state.requestPending = false;
    });
});
