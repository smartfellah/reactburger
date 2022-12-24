import { apiRequest } from "../../utils/api-request";
import { dataURL } from "../../utils/endpoint";

export const GET_ALL_INGREDIENTS_REQUEST = "GET_ALL_INGREDIENTS";
export const GET_ALL_INGREDIENTS_ERROR = "GET_ALL_INGREDIENTS_ERROR";
export const GET_ALL_INGREDIENTS_SUCCESS = "GET_ALL_INGREDIENTS_SUCCESS";

export const getAllIngredients = () => (dispatch) => {
  dispatch({
    type: GET_ALL_INGREDIENTS_REQUEST,
  });
  apiRequest(`${dataURL}/ingredients`)
    .then((result) => {
      if (result && result.success) {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          payload: result,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_INGREDIENTS_ERROR,
      });
    });
};
