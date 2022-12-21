import { apiRequest } from "../../utils/api-request";
import { dataURL } from "../../utils/endpoint";

export const GET_ALL_INGREDIENTS = "GET_ALL_INGREDIENTS";
export const GET_ALL_INGREDIENTS_ERROR = "GET_ALL_INGREDIENTS_ERROR";
export const GET_ALL_INGREDIENTS_SUCCESS = "GET_ALL_INGREDIENTS_SUCCESS";

export const getAllIngredients = () => (dispatch) => {
  dispatch({
    type: GET_ALL_INGREDIENTS,
  });
  try {
    const data = apiRequest(`${dataURL}/ingredients`);
    dispatch({
      type: GET_ALL_INGREDIENTS_SUCCESS,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_INGREDIENTS_ERROR,
    });
  }
};
