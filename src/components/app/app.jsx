import React, { useEffect, useState, useReducer } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getAllIngredients } from "../../services/actions/ingredients-actions";

//Components
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

//Styles
import appStyles from "./app.module.css";

function App() {
  const dispatch = useDispatch();
  const { hasError, isLoading } = useSelector((store) => {
    return store.ingredientsReducer;
  });

  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  return (
    <div className={`${appStyles.App}`}>
      <AppHeader />
      {!hasError && !isLoading ? (
        <main className={`${appStyles.ColumnsWrapper}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      ) : null}
    </div>
  );
}

export default App;
