import React, {useEffect, useState} from 'react';
import {ThemeProvider} from "styled-components";
import "./App.css"
import {DarkModeSwitch} from './components/DarkMode/DarkModeSwitch';
import {DarkTheme, LightTheme} from "./components/DarkMode/Themes";
import {TodoAppWrapper} from "./components/Content/TodoAppWrapper";
import {MainContent} from "./components/Content/MainContent";
import {Container} from "./common/Container";
import Header from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {Preloader} from "./common/preloader/Preloader";
import {fetchTodolists} from "./state/reducers/todolistReducer/todolists-reducer";

export type ThemeModeType = "light" | "dark"

function App() {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const [theme, setTheme] = useState<ThemeModeType>("light")
    const isDarkTheme = theme === "dark"

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    return (
        <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
            {
                status === "loading" ?
                    <Preloader/>
                    :
                    <TodoAppWrapper>
                        <Header>
                            <DarkModeSwitch setTheme={setTheme} theme={theme}/>
                        </Header>
                        <Container>
                            <MainContent/>
                        </Container>

                    </TodoAppWrapper>
            }

        </ThemeProvider>
    );
}

export default App;
