//Types
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TRootState } from "../create-store";
import { TSendOrderActions } from "./order-actions";

export type TAppActions = TSendOrderActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, TRootState, any, TAppActions>
>;
