//Actions
import { TIngredientsData } from "../../components/burger-ingredients/types";
import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_ERROR,
  GET_ALL_INGREDIENTS_SUCCESS,
  TGetAllIngredientsActions,
} from "../actions/ingredients-actions";

export type TIngredientsReducerInitialState = {
  data: TIngredientsData | {};
  hasError: boolean;
  isLoading: boolean;
};

const initialState = {
  data: [],
  hasError: false,
  isLoading: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TGetAllIngredientsActions
) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_REQUEST:
      return {
        ...state,
        hasError: false,
        isLoading: true,
      };
    case GET_ALL_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        hasError: false,
        isLoading: false,
      };
    case GET_ALL_INGREDIENTS_ERROR:
      return {
        ...initialState,
        hasError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
