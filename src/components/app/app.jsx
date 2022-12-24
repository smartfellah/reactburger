import React, { useEffect } from "react";

//React-DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          <main className={`${appStyles.ColumnsWrapper}`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      ) : null}
    </div>
  );
}

export default App;
