import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {logoutTC} from "../../state/reducers/auth-reducer/auth-reduser";
import {MyButton} from "../../common/Button";

export const LoginBtn = () => {
    const isAuth = useAppSelector(state => state.auth.login)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
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
