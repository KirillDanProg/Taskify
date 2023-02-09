import React, { lazy, memo, Suspense, useEffect } from 'react';
import Header from "./Header/Header";
import { DarkModeSwitch } from "./DarkMode/DarkModeSwitch";
import { ThemeModeType } from "../App";
import { TodoAppWrapper } from "./Content/TodoAppWrapper";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Login/Login";
import { useAppSelector } from "../hooks/reduxHooks";
import { Container } from "../common/Container";
import { selectIsAuth } from "../features/selectors";

const MainContent = lazy(() => import("../components/Content"))

export const TodoApp = memo((props: { theme: ThemeModeType }) => {
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        isAuth
            ? navigate("/")
            : navigate("/login")
    }, [isAuth])

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch theme={props.theme} />
            </Header>
            <Routes>
                <Route path={"/"} element={<Container>
                    <Suspense fallback="">
                        <MainContent />
                    </Suspense>
                </Container>} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </TodoAppWrapper>
    );
});

