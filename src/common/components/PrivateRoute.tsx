import { useMeQuery } from "features/auth/authApi";
import React from "react";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { data } = useMeQuery();
  const isAuth = data?.id;
  if (!isAuth) {
    return <Navigate to="login" />;
  }

  return children;
};
