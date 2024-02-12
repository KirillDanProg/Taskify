import { selectIsAuth } from "features/auth/selectors";
import { useAppSelector } from "hooks/reduxHooks";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) {
    return <Navigate to='login' />;
  }

  return children;
};
