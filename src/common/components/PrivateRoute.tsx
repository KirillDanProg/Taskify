import { useMeQuery } from "features/auth/authApi";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data } = useMeQuery();
  const isAuth = data?.id;
  if (!isAuth) {
    return <Navigate to="login" />;
  }

  return children;
};
