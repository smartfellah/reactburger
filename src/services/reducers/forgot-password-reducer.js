import * as a from "../actions/forgot-password-actions";
const initialState = {
  emailForm: "",
};
export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.EMAIL_CHANGE:
      console.log(action.payload);
      return { ...state, emailForm: action.payload };
    default:
      return { ...state };
  }
};
