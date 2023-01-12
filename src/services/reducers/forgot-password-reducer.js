import * as a from "../actions/forgot-password-actions";
const initialState = {
  emailForm: "",
  requestPending: false,
  requestError: false,
};
export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.EMAIL_CHANGE:
      return { ...state, emailForm: action.payload };
    case a.CHECK_EMAIL_REQUEST:
      return { ...state, requestPending: true };
    case a.CHECK_EMAIL_ERROR:
      return { ...initialState, requestPending: false, requestError: true };
    default:
      return { ...state };
  }
};
