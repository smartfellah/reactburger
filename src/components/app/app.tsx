import { useEffect } from "react";

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
import { checkUserAuth } from "../../services/actions/auth-actions";
import { Dispatch } from "redux";

//Components
import { AppHeader } from "../app-header/app-header";

import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

function App() {
  const dispatch = useDispatch<Dispatch<any>>();
  const { hasError, isLoading } = useSelector((store: any) => {
    return store.ingredientsReducer;
  });

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getAllIngredients());
  }, [dispatch]);

  return (
    <>
      {!hasError && !isLoading ? (
        <Router>
          <DndProvider backend={HTML5Backend}>
            <AppHeader />
            <Routes>
              <Route path="/" element={<Pages.HomePage></Pages.HomePage>} />
              <Route
                path="/ingredients/:id"
                element={<Pages.SingleIngredient />}
              />
              <Route
                path="/login"
                element={
                  <ProtectedRouteElement
                    element={<Pages.LoginPage />}
                    unAuthOnly
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRouteElement
                    element={<Pages.RegisterPage />}
                    unAuthOnly
                  />
                }
              />
              <Route
                path="/profile"
                element={<ProtectedRouteElement element={<Pages.Profile />} />}
              >
                <Route
                  path="orders"
                  element={
                    <ProtectedRouteElement element={<Pages.Profile />} />
                  }
                />
              </Route>
              <Route
                path="/forgot-password"
                element={
                  <ProtectedRouteElement
                    element={<Pages.ForgotPassword />}
                    unAuthOnly
                  />
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRouteElement
                    element={<Pages.ResetPassword />}
                    unAuthOnly
                  />
                }
              />
              <Route path="*" element={<Pages.Page404 />} />
            </Routes>
          </DndProvider>
        </Router>
      ) : null}
    </>
  );
}

export default App;
