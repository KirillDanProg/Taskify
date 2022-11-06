import React from 'react';
import Header from "./Header/Header";
import {DarkModeSwitch} from "./DarkMode/DarkModeSwitch";
import {Container} from "../common/Container";
import {MainContent} from "./Content/MainContent";
import {ThemeModeType} from "../App";
import {TodoAppWrapper} from "./Content/TodoAppWrapper";
import {Preloader} from "../common/preloader/Preloader";
import {Route, Routes} from "react-router-dom";
import {Login} from "./Login/Login";
import {useAppSelector} from "../hooks/reduxHooks";

export const TodoApp = (props: { theme: ThemeModeType, setTheme: (value: ThemeModeType) => void }) => {
    const status = useAppSelector(state => state.app.status)

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch setTheme={props.setTheme} theme={props.theme}/>
            </Header>
            {
                status === "loading" ?
                    <Preloader/>
                    :
                    <Routes>
                        <Route path={"/"} element={<Container>
                            <MainContent/>
                        </Container>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
            }
        </TodoAppWrapper>
    );
};

