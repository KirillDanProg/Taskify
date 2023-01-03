import React, {useEffect, useRef} from 'react';
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
import {selectCurrentStatus} from "../features/selectors";

export const TodoApp = (props: { theme: ThemeModeType }) => {

    const firstMount = useRef(true)

    const status = useAppSelector(selectCurrentStatus)

    useEffect(() => { firstMount.current = false }, [])

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch theme={props.theme}/>
            </Header>
            {
                status === "loading" && firstMount.current
                    ? <Preloader/>
                    : <Routes>
                        <Route path={"/"} element={<Container>
                            <MainContent/>
                        </Container>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
            }
        </TodoAppWrapper>
    );
};

