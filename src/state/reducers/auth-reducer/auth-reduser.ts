import {AppThunk} from "../../store";
import {authAPI} from "../../../api/authAPI";
import {ResultCode} from "../../../api/todolists-api";
import {setErrorAC, setStatusAC} from "../app-reducer/app-reducer";
import {fetchTodolists} from "../todolistReducer/todolists-reducer";
import {networkErrorsHandler, serverErrorsHandler} from "../../../common/handlers/errorHandler/error-handlers";
import {securityAPI} from "../../../api/security-api";

export type AuthInitialStateType = {
    email: string
    login: string
    id: number | null
    captchaUrl?: string
}

export type LoginDataType = {
    email: string
    password: string
    captcha?: string
}
const initialStateType = {
    email: "",
    login: "",
    id: null as number | null,
    captchaUrl: ""
}

export const authReducer = (state: AuthInitialStateType = initialStateType, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case LOGIN:
            return {...state, id: action.id}
        case AUTH_ME:
            return {...state, ...action.data}
        case SET_CAPTCHA:
            return {...state, captchaUrl: action.captcha}
        default:
            return state
    }
}
//actions variables
const LOGIN = "LOGIN"
const AUTH_ME = "AUTH-ME"
const SET_CAPTCHA = "SET-CAPTCHA"

//action creators type
export type ActionType = ReturnType<typeof loginAC>
    | ReturnType<typeof authMeAC>
    | ReturnType<typeof setCaptcha>

// action creators
export const loginAC = (id: number | null) => {
    return {
        type: LOGIN,
        id
    } as const
}
export const authMeAC = (data: AuthInitialStateType) => {
    return {
        type: AUTH_ME,
        data
    } as const
}

export const setCaptcha = (captcha: string) => {
    return {
        type: SET_CAPTCHA,
        captcha
    } as const
}


export const loginTC = (data: LoginDataType): AppThunk => async dispatch => {
    try {
        const res = await authAPI.login(data)
        const {userId} = res.data.data
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(loginAC(userId))
            dispatch(authMe())
        } else if (res.data.resultCode === ResultCode.CAPTCHA) {
            const res = await securityAPI.getCaptcha()
            dispatch(setCaptcha(res.data.url))
        } else {
            serverErrorsHandler(res.data.messages[0], dispatch)
        }
    } catch (e) {
        networkErrorsHandler(dispatch, e, setErrorAC, setStatusAC)
    } finally {
        setStatusAC("idle")
    }

}

export const logoutTC = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            const logoutData = {
                email: "",
                login: "",
                id: null
            }
            dispatch(authMeAC(logoutData))
        }
    } catch (e) {
        networkErrorsHandler(dispatch, e, setErrorAC, setStatusAC)
    } finally {
        setStatusAC("idle")
    }

}

export const authMe = (): AppThunk => async dispatch => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.OK) {
        dispatch(authMeAC(res.data.data))
        dispatch(fetchTodolists())
        dispatch(setStatusAC("succeeded"))
    } else {
        serverErrorsHandler(res.data.messages[0], dispatch)
    }
}
