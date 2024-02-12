import MainContent from "components/Content";
import { Login } from "components/Login/Login";
import { Layout } from "components/Layout";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "common/PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <MainContent />
            </PrivateRoute>
          }
        />
        <Route path={"login"} element={<Login />} />
      </Route>
    </Routes>
  );
};
