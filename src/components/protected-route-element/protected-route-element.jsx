import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { ProtectedRouteLoader } from "./protected-route-loader";

export function ProtectedRouteElement({ element, unAuthOnly = false }) {
  const authChecked = useSelector((store) => {
    return store.authReducer.authChecked;
  });
  const isUser = useSelector((store) => {
    return store.authReducer.user ? true : false;
  });

  if (!authChecked) {
    return <ProtectedRouteLoader />;
  }

  if (unAuthOnly && isUser) {
    return <Navigate to="/" replace />;
  }

  if (!unAuthOnly && isUser) {
    return element;
  }

  if (!unAuthOnly && !isUser) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
