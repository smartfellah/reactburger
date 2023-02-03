import { combineReducers } from "redux";

import { constructorReducer } from "./constructor-reducer";
import { ingredientsReducer } from "./ingredients-reducer";
import { orderReducer } from "./order-reducer";
import { singleIngredientReducer } from "./single-ingredient-reducer";
import { forgotPasswordReducer } from "./forgot-password-reducer";
import { registerReducer } from "./register-reducer";

export const rootReducer = combineReducers({
  constructorReducer,
  ingredientsReducer,
  orderReducer,
  singleIngredientReducer,
  forgotPasswordReducer,
  registerReducer,
});
