import React from 'react';
import {ThemeProvider} from "styled-components";
import "./App.css"
import {themes} from "./components/DarkMode/Themes";
import {useAppSelector} from "./hooks/reduxHooks";
import {TodoApp} from "./components/TodoApp";
import CustomizedSnackbars from "./common/handlers/Snackbar";
import {useMeQuery} from "./features/auth/authApi";
import {selectCurrentTheme} from "./features/selectors";
import {Preloader} from "./common/preloader/Preloader";

export type ThemeModeType = "light" | "dark"

export const App = () => {


    const {isLoading} = useMeQuery()
    const theme = useAppSelector(selectCurrentTheme)


    return (
        <ThemeProvider theme={themes[theme]}>
            <CustomizedSnackbars/>
            {
                isLoading
                    ? <Preloader/>
                    : <TodoApp theme={theme}/>
            }
        </ThemeProvider>
    );
}
