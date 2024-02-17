import { useMeQuery } from "features/auth/authApi";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data } = useMeQuery();
  const isAuth = data?.id;
  if (!isAuth) {
    return <Navigate to='login' />;
  }

  return children;
};
