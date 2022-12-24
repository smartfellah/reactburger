import {
  GET_ALL_INGREDIENTS,
  GET_ALL_INGREDIENTS_ERROR,
  GET_ALL_INGREDIENTS_SUCCESS,
} from "../actions/ingredients-actions";

const initialState = {
  data: [],
  hasError: false,
  isLoading: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS:
      return {
        ...state,
        hasError: false,
        isLoading: true,
      };
    case GET_ALL_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: [...action.payload.data],
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
