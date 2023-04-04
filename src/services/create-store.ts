import { rootReducer } from "./reducers/root-reducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  wsConnecting,
  wsClose,
  wsError,
  wsMessage,
  wsOpen,
  connect,
  disconnect,
} from "./feed/actions";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import {
  TWsActionTypes,
  createSocketMiddleware,
} from "./feed/socket-middleware";

const wsActions: TWsActionTypes = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
};

export type TRootState = ReturnType<typeof rootReducer>;

const feedMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
});

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

type TAppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<TAppDispatch>();
