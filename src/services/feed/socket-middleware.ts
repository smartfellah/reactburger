import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { TRootState } from "../create-store";
import { TOrderType } from "./types";

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;

  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TWSResponse>;
};

export type TWSResponse = {
  success: boolean;
  orders: Array<TOrderType>;
  total: number;
  totalToday: number;
};

export const createSocketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(`${action.payload}`);
        dispatch(wsConnecting());
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError("error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TWSResponse = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(onClose);
        };

        if (wsSendMessage?.match(action)) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
};
