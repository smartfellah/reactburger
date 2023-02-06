import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export function ProtectedRouteElement({ element }) {
  const isAuth = getCookie("accessToken") ? true : false;
  return isAuth ? element : <Navigate to="/login" replace />;
}
