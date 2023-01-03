import React, {useEffect} from 'react';
import {ThemeProvider} from "styled-components";
import "./App.css"
import {themes} from "./components/DarkMode/Themes";
import { useAppSelector} from "./hooks/reduxHooks";
import {TodoApp} from "./components/TodoApp";
import {useNavigate} from "react-router-dom";
import CustomizedSnackbars from "./common/handlers/Snackbar";
import {useMeQuery} from "./features/auth/authApi";
import {selectCurrentTheme, selectIsAuth} from "./features/selectors";

export type ThemeModeType = "light" | "dark"

export const App = () => {
    const isAuth = useAppSelector(selectIsAuth)

    const navigate = useNavigate()

    const {} = useMeQuery()
    const theme = useAppSelector(selectCurrentTheme)


    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        } else {
            navigate("/")
        }

    }, [isAuth])

    return (
        <ThemeProvider theme={themes[theme]}>
            <CustomizedSnackbars/>
            <TodoApp theme={theme}/>
        </ThemeProvider>
    );
}

