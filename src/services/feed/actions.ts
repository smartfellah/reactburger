import { createAction } from "@reduxjs/toolkit";
import { TOrderType } from "./types";

export const connect = createAction("FEED_CONNECT");
export const disconnect = createAction("FEED_DISCONNECT");

export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsMessage = createAction<Array<TOrderType>, "FEED_WS_MESSAGE">(
  "FEED_WS_MESSAGE"
);
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");

export type TwsActions =
  | typeof connect
  | typeof disconnect
  | typeof wsConnecting
  | typeof wsOpen
  | typeof wsClose
  | typeof wsMessage
  | typeof wsError;
