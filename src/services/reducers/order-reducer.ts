import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  TOrderActions,
} from "../actions/order-actions";

type TOrderReducerInitialState = {
  data: {
    name: string;
    result: number;
  } | null;
  isShown: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TOrderReducerInitialState = {
  data: null,
  isShown: false,
  isLoading: false,
  hasError: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: { ...action.payload },
      };
    case SEND_ORDER_ERROR:
      return {
        ...initialState,
        isLoading: false,
        hasError: true,
      };
    case SHOW_ORDER_DETAILS:
      return {
        ...state,
        isShown: true,
      };
    case HIDE_ORDER_DETAILS:
      return {
        ...initialState,
        isShown: false,
      };
    default:
      return state;
  }
};
