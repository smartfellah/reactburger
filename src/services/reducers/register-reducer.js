import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  NAME_CHANGE,
  registerRequestAction,
} from "../actions/register-actions";

const initialState = {
  email: "",
  password: "",
  name: "",
  requestPending: false,
  requestError: false,
};

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case EMAIL_CHANGE:
      return {
        ...state,
        email: action.payload,
      };
    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.payload,
      };
    case NAME_CHANGE:
      return {
        ...state,
        name: action.payload,
      };
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
        requestError: false,
        requestPending: false,
      };
    default:
      return state;
  }
}
