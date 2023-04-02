//API
import { apiRequest, checkSuccess } from "../../utils/api-request";
import { dataURL } from "../../utils/endpoint";

//Types
import { Dispatch } from "redux";
import { AppThunk } from "./types";
import { TIngredientsData } from "../../components/burger-ingredients/types";

export const GET_ALL_INGREDIENTS_REQUEST: "GET_ALL_INGREDIENTS" =
  "GET_ALL_INGREDIENTS";
export const GET_ALL_INGREDIENTS_ERROR: "GET_ALL_INGREDIENTS_ERROR" =
  "GET_ALL_INGREDIENTS_ERROR";
export const GET_ALL_INGREDIENTS_SUCCESS: "GET_ALL_INGREDIENTS_SUCCESS" =
  "GET_ALL_INGREDIENTS_SUCCESS";

type TGetAllIngredientsRequest = {
  readonly type: typeof GET_ALL_INGREDIENTS_REQUEST;
};
type TGetAllIngredientsError = {
  readonly type: typeof GET_ALL_INGREDIENTS_ERROR;
};
type TGetAllIngredientsSuccess = {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
  readonly payload: TIngredientsData;
};

export type TGetAllIngredientsActions =
  | TGetAllIngredientsRequest
  | TGetAllIngredientsError
  | TGetAllIngredientsSuccess;

export type TGetAllIngredientsResponse = {
  data: TIngredientsData;
  success: boolean;
};
export const getAllIngredients: AppThunk = () => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_ALL_INGREDIENTS_REQUEST,
  });
  try {
    const response = await apiRequest<TGetAllIngredientsResponse>(
      `${dataURL}/ingredients`
    );
    checkSuccess(response);
    dispatch({
      type: GET_ALL_INGREDIENTS_SUCCESS,
      payload: response.data,
    });
  } catch {
    dispatch({
      type: GET_ALL_INGREDIENTS_ERROR,
    });
  }
};
