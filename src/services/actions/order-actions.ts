//Types
import { TRequestData } from "../../components/burger-constructor/types";
import { Dispatch } from "redux";

//API
import { apiRequest } from "../../utils/api-request";
import { dataURL } from "../../utils/endpoint";
import { getCookie } from "../../utils/cookie";
import { AppThunk } from "./types";
import { TSingleOrder } from "../../pages/single-order";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR: "SEND_ORDER_ERROR" = "SEND_ORDER_ERROR";
export const SHOW_ORDER_DETAILS: "SHOW_ORDER_DETAILS" = "SHOW_ORDER_DETAILS";
export const HIDE_ORDER_DETAILS: "HIDE_ORDER_DETAILS" = "HIDE_ORDER_DETAILS";

type TShowOrderDetails = {
  readonly type: typeof SHOW_ORDER_DETAILS;
};
type THideOrderDetails = {
  readonly type: typeof HIDE_ORDER_DETAILS;
};
type TOrderDetails = TShowOrderDetails | THideOrderDetails;

export type TSendOrderRequestAction = {
  readonly type: typeof SEND_ORDER_REQUEST;
};

export type TSendOrderSuccessAction = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: {
    name: string;
    number: number;
  };
};

export type TSendOrderErrorAction = {
  readonly type: typeof SEND_ORDER_ERROR;
};

export type TSendOrderActions =
  | TSendOrderRequestAction
  | TSendOrderSuccessAction
  | TSendOrderErrorAction;

export type TOrderActions = TSendOrderActions | TOrderDetails;

type TOrderResponse = {
  name: string;
  order: TSingleOrder;
  success: boolean;
};
export const sendOrder: AppThunk =
  (ingredients: TRequestData) => async (dispatch: Dispatch) => {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    try {
      const response = await apiRequest<TOrderResponse>(`${dataURL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ ingredients }),
      });
      dispatch({
        type: SEND_ORDER_SUCCESS,
        payload: { name: response.name, number: response.order.number },
      });
    } catch {
      dispatch({
        type: SEND_ORDER_ERROR,
      });
    }
  };
