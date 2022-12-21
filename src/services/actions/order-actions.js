import { apiRequest } from "../../utils/api-request";
import { dataURL } from "../../utils/endpoint";

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";

export const sendOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: SEND_ORDER_REQUEST,
  });
  apiRequest(`${dataURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((result) => {
      if (result && result.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: { name: result.name, number: result.order.number },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SEND_ORDER_ERROR,
      });
    });
};
