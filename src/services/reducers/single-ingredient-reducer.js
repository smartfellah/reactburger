import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
} from "../actions/single-ingredient-actions";

const initialState = {
  data: {},
  isShown: false,
};

export const singleIngredientReducer = (state = initialState, action) => {
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
        data: initialState.data,
        isShown: false,
      };
    default:
      return state;
  }
};
