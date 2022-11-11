import React, {useEffect} from 'react';
import {ThemeProvider} from "styled-components";
import "./App.css"
import {themes} from "./components/DarkMode/Themes";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {TodoApp} from "./components/TodoApp";
import {  useNavigate} from "react-router-dom";
import {initializeAppTC} from "./state/reducers/app-reducer/app-reducer";
import CustomizedSnackbars from "./common/handlers/errorHandler/snackbar";
import {getAppThemeTC} from "./state/reducers/theme-reducer/theme-reducer";

export type ThemeModeType = "light" | "dark"

function App() {
    const isAuth = useAppSelector(state => state.auth.email)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const theme = useAppSelector(state => state.theme.theme)


    useEffect(() => {
       dispatch(initializeAppTC())
        dispatch(getAppThemeTC())
    }, [])

    useEffect(() => {
        if(!isAuth) {
            navigate("/login")
        } else {
            navigate("/")
        }

    }, [isAuth])

    return (
        <ThemeProvider theme={themes[theme]}>
            <CustomizedSnackbars/>
            <TodoApp theme={theme} />
        </ThemeProvider>
    );
}

export default App;
