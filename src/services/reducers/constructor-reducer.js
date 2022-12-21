import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DELETE_FROM_CONSTRUCTOR,
} from "../actions/constructor-actions";

const initialState = {
  bun: {},
  data: [],
  totalCost: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data, { ...action.payload, Uid: crypto.randomUUID() }],
        totalCost: (state.totalCost += action.payload.price),
      };
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: { ...action.payload },
        totalCost:
          state.totalCost +
          action.payload.price * 2 -
          (state.bun.price ? state.bun.price * 2 : 0),
      };
    case DELETE_FROM_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data].filter((elem) => {
          return elem.Uid !== action.Uid;
        }),
      };
    default:
      return state;
  }
};
