//Types
import { TConstructorIngredient } from "../../components/burger-constructor/types";

export const ADD_INGREDIENT_TO_CONSTRUCTOR: "ADD_INGREDIENT_TO_CONSTRUCTOR" =
  "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR: "ADD_BUN_TO_CONSTRUCTOR" =
  "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_FROM_CONSTRUCTOR: "DELETE_FROM_CONSTRUCTOR" =
  "DELETE_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const SWAP_ELEMENTS: "SWAP_ELEMENTS" = "SWAP_ELEMENTS";

type TAddIngredientToConstructor = {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
};
type TAddBunToConstructor = {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
};
type TDeleteFromConstructor = {
  readonly type: typeof DELETE_FROM_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
};
type TClearConstructor = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
};
type TSwapElements = {
  readonly type: typeof SWAP_ELEMENTS;
  readonly payload: { dragFrom: number; dropTo: number };
};

export type TConstructorActions =
  | TAddIngredientToConstructor
  | TAddBunToConstructor
  | TDeleteFromConstructor
  | TClearConstructor
  | TSwapElements;

export const addIngredient = (
  ingredientData: TConstructorIngredient,
  uid: string
): TConstructorActions => {
  switch (ingredientData.type) {
    case "bun":
      return {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredientData,
      };

    default:
      return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: { ...ingredientData, Uid: uid },
      };
  }
};
