import { TOrderType, WebsocketStatus } from "./types";
import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";

type TFeedStore = {
  status: WebsocketStatus;
  error: string;
  data: Array<TOrderType>;
};

const initialState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  error: "",
  data: [],
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = action.payload;
    });
});
