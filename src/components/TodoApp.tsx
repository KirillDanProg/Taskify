import { memo, useEffect } from 'react';
import Header from "./Header/Header";
import { DarkModeSwitch } from "./DarkMode/DarkModeSwitch";
import { ThemeModeType } from "../App";
import { TodoAppWrapper } from "./Content/TodoAppWrapper";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from 'features/app/routes/AppRoutes';

export const TodoApp = memo((props: { theme: ThemeModeType, userId?: number }) => {
    const navigate = useNavigate()
    const { theme, userId } = props

    useEffect(() => {
        userId
            ? navigate("/")
            : navigate("/login")
    }, [userId, navigate])

    return (
        <TodoAppWrapper>
            <Header>
                <DarkModeSwitch theme={theme} />
            </Header>
            <AppRoutes />
        </TodoAppWrapper>
    );
});

