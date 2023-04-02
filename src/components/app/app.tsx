import { useEffect } from "react";

//React-Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import * as Pages from "../../pages";

//React-DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//Redux
import { getAllIngredients } from "../../services/actions/ingredients-actions";
import { checkUserAuth } from "../../services/actions/auth-actions";
import { store, useDispatch, useSelector } from "../../services/create-store";

//Components
import { AppHeader } from "../app-header/app-header";

import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { WebsocketStatus } from "../../services/feed/types";
import {
  connect as feedConnect,
  disconnect as feedDisconnect,
} from "../../services/feed/actions";
import { feedURL } from "../../utils/endpoint";

function App() {
  const dispatch = useDispatch();
  const { hasError, isLoading } = useSelector((store) => {
    return store.ingredientsReducer;
  });

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getAllIngredients());
  }, [dispatch]);

  const { status } = useSelector((store) => {
    return store.feedReducer;
  });
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  const connect = () => {
    dispatch(feedConnect(feedURL));
  };
  const disconnect = () => dispatch(feedDisconnect());

  useEffect(() => {
    connect();
  }, []);
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
                  element={<ProtectedRouteElement element={<Pages.Orders />} />}
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
              <Route path="/feed" element={<Pages.Feed />} />
              <Route path="/feed/:number" element={<Pages.SingleOrder />} />
            </Routes>
          </DndProvider>
        </Router>
      ) : null}
    </>
  );
}

export default App;
