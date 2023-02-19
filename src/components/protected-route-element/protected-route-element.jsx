import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRouteLoader } from "./protected-route-loader";
import { PropTypes } from "prop-types";

export function ProtectedRouteElement({ element, unAuthOnly = false }) {
  const location = useLocation();
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
    const redirectTo = location?.state?.from;
    return <Navigate to={redirectTo ? redirectTo : "/"} replace />;
  }

  if (!unAuthOnly && isUser) {
    return element;
  }

  if (!unAuthOnly && !isUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
  unAuthOnly: PropTypes.bool,
};
