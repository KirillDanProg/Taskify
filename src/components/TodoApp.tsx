import React, {useEffect, useRef} from 'react';
import Header from "./Header/Header";
import {DarkModeSwitch} from "./DarkMode/DarkModeSwitch";
import {MainContent} from "./Content/MainContent";
import {ThemeModeType} from "../App";
import {TodoAppWrapper} from "./Content/TodoAppWrapper";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./Login/Login";
import {useAppSelector} from "../hooks/reduxHooks";
import {Container} from "../common/Container";
import {selectIsAuth} from "../features/selectors";

export const TodoApp = (props: { theme: ThemeModeType }) => {

    const firstMount = useRef(true)
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        firstMount.current = false
    }, [])

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        } else {
            navigate("/")
        }
    }, [isAuth])

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch theme={props.theme}/>
            </Header>
            <Routes>
                <Route path={"/"} element={<Container>
                    <MainContent/>
                </Container>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </TodoAppWrapper>
    );
};

