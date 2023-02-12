import React, { useEffect } from "react";

//React-Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

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
      <Router>
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/login" element={<Pages.LoginPage />} />
          <Route path="/register" element={<Pages.RegisterPage />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Pages.Profile />} />}
          >
            <Route
              path="/profile/orders"
              element={<ProtectedRouteElement element={<Pages.Profile />} />}
            />
          </Route>
          <Route path="/forgot-password" element={<Pages.ForgotPassword />} />
          <Route path="/reset-password" element={<Pages.ResetPassword />} />
          <Route path="*" element={<Pages.Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
