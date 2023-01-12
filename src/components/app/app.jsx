import React, { useEffect } from "react";

//React-Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import * as Pages from "../../pages";

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
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Pages.HomePage>
              <div className={`${appStyles.App}`}>
                {!hasError && !isLoading ? (
                  <DndProvider backend={HTML5Backend}>
                    <main className={`${appStyles.ColumnsWrapper}`}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </main>
                  </DndProvider>
                ) : null}
              </div>
            </Pages.HomePage>
          </Route>
          <Route path="/login">
            <Pages.LogInPage></Pages.LogInPage>
          </Route>
          <Route path="/register">
            <Pages.RegisterPage></Pages.RegisterPage>
          </Route>
          <Route path="*">
            <Pages.Page404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
