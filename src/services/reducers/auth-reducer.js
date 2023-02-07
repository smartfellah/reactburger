import {
  loginRequestAction,
  logoutRequestAction,
  registerRequestAction,
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
        requestPending: false,
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
        requestPending: false,
        requestError: false,
      };
    default:
      return state;
  }
}
