import { dataURL } from "../../utils/endpoint";
import { apiRequest } from "../../utils/api-request";
import { setCookie } from "../../utils/set-cookie";

export const EMAIL_CHANGE = "(register)EMAIL_CHANGE";
export const PASSWORD_CHANGE = "(register)PASSWORD_CHANGE";
export const NAME_CHANGE = "(register)NAME_CHANGE";

export const REGISTER_REQUEST = "(register)REGISTER_REQUEST";
export const REGISTER_ERROR = "(register)REGISTER_ERROR";
export const REGISTER_SUCCESS = "(register)REGISTER_SUCCESS";

export function registerRequestAction(actionTypeString) {
  switch (actionTypeString) {
    case "request":
      return {
        type: "(register)REGISTER_REQUEST",
      };
    case "error":
      return {
        type: "(register)REGISTER_ERROR",
      };
    case "success":
      return {
        type: "(register)REGISTER_SUCCESS",
      };
    default:
      return {
        type: "(register)REGISTER_REQUEST",
      };
  }
}

export function sendRegisterRequest(requestBody) {
  return async function registerRequestThunk(dispatch) {
    dispatch(registerRequestAction());
    let response;
    try {
      response = await apiRequest(`${dataURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...requestBody }),
      });
      const accessToken = response.accessToken.split("Bearer ")[1];
      const refreshToken = response.refreshToken;
      setCookie("accessToken", accessToken, { expires: 1200 });
      setCookie("refreshToken", refreshToken);

      dispatch(registerRequestAction("success"));
    } catch (error) {
      dispatch(registerRequestAction("error"));
      console.log(error.name);
    }
    console.log(response);
  };
}
