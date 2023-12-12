import { Container } from "@mui/material";
import MainContent from "components/Content";
import { Login } from "components/Login/Login";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Container>
        <MainContent />
      </Container>} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};
