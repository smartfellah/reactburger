import { ADD_TO_CONSTRUCTOR } from "../actions/constructor-actions";
import { DELETE_FROM_CONSTRUCTOR } from "../actions/constructor-actions";

const initialState = {
  bun: {},
  data: [],
  totalCost: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data, action.payload],
        totalCost: (state.totalCost += action.payload.price),
      };
    default:
      return state;
  }
};
