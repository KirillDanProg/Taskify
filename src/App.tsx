import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "styled-components";
import "./App.css"
import {DarkTheme, LightTheme} from "./components/DarkMode/Themes";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {TodoApp} from "./components/TodoApp";
import {  useNavigate} from "react-router-dom";
import {initializeAppTC} from "./state/reducers/app-reducer/app-reducer";
import CustomizedSnackbars from "./errorHandler/snackbar";

export type ThemeModeType = "light" | "dark"

function App() {
    const isAuth = useAppSelector(state => state.auth.email)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [theme, setTheme] = useState<ThemeModeType>("light")
    const isDarkTheme = theme === "dark"

    useEffect(() => {
       dispatch(initializeAppTC())
        if(!isAuth) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if(!isAuth) {
            navigate("/login")
        } else {
            navigate("/")
        }

    }, [isAuth])

    return (
        <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
            <CustomizedSnackbars/>
            <TodoApp theme={theme} setTheme={setTheme}/>
        </ThemeProvider>
    );
}

export default App;
