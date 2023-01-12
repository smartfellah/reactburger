import { dataURL } from "../../utils/endpoint";
import { apiRequest } from "../../utils/api-request";

export const EMAIL_CHANGE = "(forgot-password)EMAIL_CHANGE";
export const CHECK_EMAIL_REQUEST = "(forgot-password)CHECK_EMAIL_REQUEST";
export const CHECK_EMAIL_SUCCESS = "(forgot-password)CHECK_EMAIL_SUCCESS";
export const CHECK_EMAIL_ERROR = "(forgot-password)CHECK_EMAIL_ERROR";

export const checkEmail = (email) => async (dispatch) => {
  dispatch({ type: CHECK_EMAIL_REQUEST });
  const response = await apiRequest(`${dataURL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};
