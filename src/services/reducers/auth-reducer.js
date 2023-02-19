import {
  forgotPasswordRequestAction,
  getUserRequestAction,
  loginRequestAction,
  logoutRequestAction,
  patchUserRequestAction,
  registerRequestAction,
  resetPasswordRequestAction,
} from "../actions/auth-actions";

const initialState = {
  user: null,
  requestPending: false,
  requestError: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case registerRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case registerRequestAction("error").type:
      return {
        ...state,
        requestError: true,
        requestPending: false,
      };
    case registerRequestAction("success").type:
      return {
        ...state,
        user: action.payload,
        requestError: false,
        requestPending: false,
      };

    case loginRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case loginRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case loginRequestAction("success").type:
      return {
        ...state,
        requestPending: false,
        requestError: false,
        user: action.payload,
      };

    case logoutRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case logoutRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case logoutRequestAction("success").type:
      return {
        ...state,
        user: null,
        requestPending: false,
        requestError: false,
      };

    case getUserRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case getUserRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case getUserRequestAction("success").type:
      return {
        ...state,
        user: { ...action.payload },
        requestPending: false,
        requestError: false,
      };

    case patchUserRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case patchUserRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case patchUserRequestAction("success").type:
      return {
        ...state,
        requestPending: false,
        requestError: false,
        user: { ...action.payload },
      };

    case forgotPasswordRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case forgotPasswordRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case forgotPasswordRequestAction("success").type:
      return {
        ...state,
        requestPending: false,
        requestError: false,
      };

    case resetPasswordRequestAction("request").type:
      return {
        ...state,
        requestPending: true,
      };
    case resetPasswordRequestAction("error").type:
      return {
        ...state,
        requestPending: false,
        requestError: true,
      };
    case resetPasswordRequestAction("success").type:
      return {
        ...state,
        requestPending: false,
        requestError: false,
      };
    default:
      return state;
  }
}
