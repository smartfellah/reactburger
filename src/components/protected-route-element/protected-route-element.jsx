import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRouteElement({ element }) {
  const authInfo = useSelector(function authInfoSelector(store) {
    return { ...store.authReducer };
  });
  return authInfo.user ? element : <Navigate to="/login" replace />;
}
