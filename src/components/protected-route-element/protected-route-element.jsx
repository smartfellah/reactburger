import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export function ProtectedRouteElement({ element }) {
  const authChecked = useSelector((store) => {
    return store.authReducer.requestPending ? false : true;
  });
  const isUser = useSelector((store) => {
    return store.authReducer.user ? true : false;
  });

  if (!authChecked) {
    return null;
  }

  if (isUser) {
    return element;
  }

  if (!isUser) {
    return <Navigate to="/login" replace />;
  }

  return null;
}
