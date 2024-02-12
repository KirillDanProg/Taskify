import Header from "./Header/Header";
import { DarkModeSwitch } from "./DarkMode/DarkModeSwitch";
import { TodoAppWrapper } from "./Content/TodoAppWrapper";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "hooks/reduxHooks";
import { selectCurrentTheme } from "common/app/selectors";

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
