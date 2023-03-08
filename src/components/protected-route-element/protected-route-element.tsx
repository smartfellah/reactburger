//Redux
import { useSelector } from "react-redux";

//Router
import { Navigate, useLocation } from "react-router-dom";

//Components
import { ProtectedRouteLoader } from "./protected-route-loader";

//Types
import { ProtectedRouteProps } from "./types";

export function ProtectedRouteElement({
  element,
  unAuthOnly = false,
}: ProtectedRouteProps): JSX.Element {
  const location = useLocation();

  const authChecked: boolean = useSelector((store: any) => {
    return store.authReducer.authChecked;
  });

  const isUser: boolean = useSelector((store: any) => {
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
