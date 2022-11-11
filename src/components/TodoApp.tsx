import React from 'react';
import Header from "./Header/Header";
import {DarkModeSwitch} from "./DarkMode/DarkModeSwitch";
import {MainContent} from "./Content/MainContent";
import {ThemeModeType} from "../App";
import {TodoAppWrapper} from "./Content/TodoAppWrapper";
import {Route, Routes} from "react-router-dom";
import {Login} from "./Login/Login";
import {useAppSelector} from "../hooks/reduxHooks";
import {Preloader} from "../common/preloader/Preloader";
import {Container} from "../common/Container";

export const TodoApp = (props: { theme: ThemeModeType }) => {

    const status = useAppSelector(state => state.app.status)

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch theme={props.theme}/>
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

