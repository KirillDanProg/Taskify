import {ThemeProvider} from "styled-components";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {useMeQuery} from "./features/auth/authApi";
import {selectCurrentTheme} from "./features/selectors";
import {themes} from "./components/DarkMode/Themes";
import {TodoApp} from "./components/TodoApp";
import {Preloader} from "./common/preloader/Preloader";
import {CustomSnackbar} from "./common/handlers/Snackbar";
import {useEffect, useRef} from 'react';
import "./App.css"
import { appInit } from "features/app/appSlice";

export type ThemeModeType = "light" | "dark"

export const App = () => {
    const firstMount = useRef(true);
    const {isLoading} = useMeQuery()

    const theme = useAppSelector(selectCurrentTheme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        firstMount.current = false
        dispatch(appInit())
    }, [])

    return (
        <ThemeProvider theme={themes[theme]}>
            {
                !firstMount.current && <CustomSnackbar/>
            }
            {
                isLoading
                    ? <Preloader/>
                    : <TodoApp theme={theme}/>
            }
        </ThemeProvider>
    );
};
