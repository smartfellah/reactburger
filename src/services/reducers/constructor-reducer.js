import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DELETE_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  SWAP_ELEMENTS,
} from "../actions/constructor-actions";

const initialState = {
  bun: {},
  data: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data, { ...action.payload, Uid: crypto.randomUUID() }],
      };
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: { ...action.payload },
      };
    case DELETE_FROM_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data].filter((elem) => {
          return elem.Uid !== action.payload.Uid;
        }),
      };
    case CLEAR_CONSTRUCTOR:
      return {
        ...initialState,
      };
    case SWAP_ELEMENTS:
      let mutableArray = [...state.data];
      mutableArray.splice(
        action.payload.dropTo,
        0,
        mutableArray.splice(action.payload.dragFrom, 1)[0]
      );
      return {
        ...state,
        data: [...mutableArray],
      };
    default:
      return state;
  }
};
