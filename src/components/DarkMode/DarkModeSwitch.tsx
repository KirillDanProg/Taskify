import React, { type FC } from "react";
import { type ThemeModeType } from "../../App";
import { Moon, Sun } from "./SetTheme";
import { Switch } from "@mui/material";
import s from "./DarkMode.module.scss";
import { themeToggleThunk } from "../../app/appSlice";
import { useAppDispatch } from "hooks/reduxHooks";

interface TodoPropsType {
  theme: ThemeModeType;
}
export const DarkModeSwitch: FC<TodoPropsType> = ({ theme }) => {
  const dispatch = useAppDispatch();

  const darkModeToggle = () => {
    dispatch(themeToggleThunk());
  };
  return (
    <div className={s.switchBox}>
      <Switch onChange={darkModeToggle} checked={theme === "dark"} />
      {theme === "light" ? <Moon /> : <Sun />}
    </div>
  );
};
