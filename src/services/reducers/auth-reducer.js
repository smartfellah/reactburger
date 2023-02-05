import { registerRequestAction } from "../actions/auth-actions";

const initialState = {
  email: "",
  password: "",
  name: "",
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
        requestError: false,
        requestPending: false,
      };
    default:
      return state;
  }
}
