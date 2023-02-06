import { dataURL } from "../../utils/endpoint";
import { apiRequest } from "../../utils/api-request";
import { setCookie } from "../../utils/set-cookie";

export function registerRequestAction(actionTypeString, userInfo) {
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
        payload: userInfo,
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

      const userInfo = response.user;

      console.log(userInfo);
      setCookie("accessToken", accessToken, { expires: 1200 });
      setCookie("refreshToken", refreshToken);

      dispatch(registerRequestAction("success", userInfo));
    } catch (error) {
      dispatch(registerRequestAction("error"));
      console.log(error.name);
    }
    //console.log(response);
  };
}
