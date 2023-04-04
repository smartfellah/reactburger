//Types
import { TSingleIngredient } from "../../components/burger-ingredients/types";

//Actions
import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  singleIngredientActions,
} from "../actions/single-ingredient-actions";

export type singleIngredientReducerInitialState = {
  data: TSingleIngredient | null;
  isShown: boolean;
};

const initialState = {
  data: null,
  isShown: false,
};

export const singleIngredientReducer = (
  state: singleIngredientReducerInitialState = initialState,
  action: singleIngredientActions
) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state,
        data: { ...action.payload },
        isShown: true,
      };
    case HIDE_INGREDIENT_DETAILS:
      return {
        ...state,
        data: null,
        isShown: false,
      };
    default:
      return state;
  }
};
