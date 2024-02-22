import Header from "./Header/Header";
import { DarkModeSwitch } from "./DarkMode/DarkModeSwitch";
import { TodoAppWrapper } from "./Content/TodoAppWrapper";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "common/hooks/reduxHooks";
import { selectCurrentTheme } from "app/selectors";

export const Layout = () => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <TodoAppWrapper>
      <Header>
        <DarkModeSwitch theme={theme} />
      </Header>
      <Outlet />
    </TodoAppWrapper>
  );
};
