import React, {FC} from 'react';
import {ThemeModeType} from "../../App";
import {Moon, Sun} from "./SetTheme";
import {Switch} from "@mui/material";
import styles from "./DarkMode.module.scss"
import {useAppDispatch} from "../../hooks/reduxHooks";
import {AppThemeType, saveAppThemeTC} from "../../state/reducers/theme-reducer/theme-reducer";


type TodoPropsType = {
    theme: ThemeModeType
}
export const DarkModeSwitch: FC<TodoPropsType> = ({theme}) => {
    const dispatch = useAppDispatch()

    const darkModeToggle = () => {
        let appTheme: AppThemeType = theme === "dark" ? "light": "dark"
        dispatch(saveAppThemeTC(appTheme))
    }
    return (
        <div className={styles.switchBox}>

            <Switch onChange={darkModeToggle} checked={theme === "dark"}/>
            {
                theme === "light" ?
                    <Moon/>
                    :
                    <Sun/>

            }


        </div>
    );
};

