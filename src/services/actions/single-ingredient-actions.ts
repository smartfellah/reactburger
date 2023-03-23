//Types
import { TSingleIngredient } from "../../components/burger-ingredients/types";

export const SHOW_INGREDIENT_DETAILS: "SHOW_INGREDIENT_DETAILS" =
  "SHOW_INGREDIENT_DETAILS";
export const HIDE_INGREDIENT_DETAILS: "HIDE_INGREDIENT_DETAILS" =
  "HIDE_INGREDIENT_DETAILS";

export type showIngredientDetailsAction = {
  readonly type: typeof SHOW_INGREDIENT_DETAILS;
  readonly payload: TSingleIngredient;
};

export type hideIngredientDetailsAction = {
  readonly type: typeof HIDE_INGREDIENT_DETAILS;
};

export type singleIngredientActions =
  | showIngredientDetailsAction
  | hideIngredientDetailsAction;
