import React, {FC} from 'react';
import {ThemeModeType} from "../../App";
import {Moon, Sun} from "./SetTheme";
import {Switch} from "@mui/material";
import styles from "./DarkMode.module.scss"


type TodoPropsType = {
    theme: ThemeModeType
    setTheme: (value: ThemeModeType) => void
}
export const DarkModeSwitch: FC<TodoPropsType> = ({theme, setTheme}) => {
    const darkModeToggle = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark")
    }
    return (
        <div className={styles.switchBox}>

            <Switch onChange={darkModeToggle}/>
            {
                theme === "light" ?
                <Moon />
                :
                <Sun />

            }


        </div>
    );
};

