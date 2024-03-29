import { combineReducers } from "redux";

import { constructorReducer } from "./constructor-reducer";
import { ingredientsReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { singleIngredientReducer } from "./single-ingredient-reducer";
import { authReducer } from "./auth-reducer";
import { feedReducer } from "../feed/reducer";

export const rootReducer = combineReducers({
  constructorReducer,
  ingredientsReducer,
  orderReducer,
  singleIngredientReducer,
  authReducer,
  feedReducer,
});
