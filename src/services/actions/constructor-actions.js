export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_FROM_CONSTRUCTOR = "DELETE_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const SWAP_ELEMENTS = "SWAP_ELEMENTS";

export const addIngredient = (ingredientData) => {
  switch (ingredientData.type) {
    case "bun":
      return {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: ingredientData,
      };

    default:
      return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredientData,
      };
  }
};
