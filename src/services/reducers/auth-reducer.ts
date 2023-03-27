import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  PATCH_USER_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TUserInfo,
  TAuthActions,
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

export function authReducer(state = initialState, action: TAuthActions) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        requestError: true,
        requestPending: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        requestError: false,
        requestPending: false,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        requestPending: false,
        requestError: false,
        user: action.payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        requestPending: false,
        requestError: false,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
        authChecked: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        requestPending: false,
        requestError: false,
        authChecked: true,
      };

    case PATCH_USER_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case PATCH_USER_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        requestPending: false,
        requestError: false,
        user: { ...action.payload },
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requestPending: false,
        requestError: false,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        requestPending: true,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        requestPending: false,
        requestError: false,
      };
    default:
      return state;
  }
}
