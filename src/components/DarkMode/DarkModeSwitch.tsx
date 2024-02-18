import React, { FC } from "react";
import { ThemeModeType } from "../../App";
import { Moon, Sun } from "./SetTheme";
import { Switch } from "@mui/material";
import styles from "./DarkMode.module.scss";
import { themeToggleThunk } from "../../app/appSlice";
import { useAppDispatch } from "hooks/reduxHooks";

type TodoPropsType = {
  theme: ThemeModeType;
};
export const DarkModeSwitch: FC<TodoPropsType> = ({ theme }) => {
  const dispatch = useAppDispatch();

  const darkModeToggle = () => {
    dispatch(themeToggleThunk());
  };
  return (
    <div className={styles.switchBox}>
      <Switch onChange={darkModeToggle} checked={theme === "dark"} />
      {theme === "light" ? <Moon /> : <Sun />}
    </div>
  );
};
