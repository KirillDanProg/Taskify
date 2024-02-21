import { ThemeProvider } from "styled-components";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useMeQuery } from "./features/auth/authApi";
import { themes } from "./components/DarkMode/Themes";
import { Preloader } from "./common/preloader/Preloader";
import { useEffect, useRef } from "react";
import { appInit } from "app/appSlice";
import { CustomSnackbar } from "common/handlers/Snackbar";
import "app/styles/index.css";
import { AppRoutes } from "app/routes/AppRoutes";
import { selectCurrentTheme } from "app/selectors";

export type ThemeModeType = "light" | "dark";

export const App = () => {
  const firstMount = useRef(true);
  const { isLoading } = useMeQuery();
  const theme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appInit());
    firstMount.current = false;
  }, []);

  if (isLoading || firstMount.current) {
    firstMount.current = false;
    return <Preloader />;
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      {!firstMount.current && <CustomSnackbar />}
      <AppRoutes />
    </ThemeProvider>
  );
};
