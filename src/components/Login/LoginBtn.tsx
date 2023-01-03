import React from "react";
import { useAppSelector} from "../../hooks/reduxHooks";
import {MyButton} from "../../common/Button";
import {useLogoutMutation} from "../../features/auth/authApi";

export const LoginBtn = () => {
    const isAuth = useAppSelector(state => state.auth.login)
    const [logout] = useLogoutMutation()

    const logoutHandler = () => {
        logout()
    }

    return (
        <>
            {
                isAuth ?
                    <MyButton  style={{color: "white"}}  onClick={logoutHandler}>LOGOUT</MyButton>
                    :
                    <h2>PWA TodoList</h2>
            }
        </>

    )
}
