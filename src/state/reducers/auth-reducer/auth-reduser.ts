import {AppThunk} from "../../store";
import {authAPI} from "../../../api/authAPI";
import {ResultCode} from "../../../api/todolists-api";
import {setErrorAC} from "../app-reducer/app-reducer";
import {fetchTodolists} from "../todolistReducer/todolists-reducer";

export type AuthInitialStateType = typeof initialStateType

export type LoginDataType = {
    email: string
    password: string
}
const initialStateType = {
    email: "",
    login: "",
    id: null as number | null
}

 export const authReducer = (state: AuthInitialStateType = initialStateType, action: ActionType): AuthInitialStateType => {
    switch(action.type) {
        case LOGIN:
            return {...state, id: action.id}
        case AUTH_ME:
            return {...state, ...action.data }
        default:
            return state
    }
}
//actions variables
const LOGIN = "LOGIN"
const AUTH_ME = "AUTH-ME"

//action creators type
export type ActionType = ReturnType<typeof loginAC>
    | ReturnType<typeof authMeAC>

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

export const loginTC = (data: LoginDataType): AppThunk => async dispatch => {
    const res = await authAPI.login(data)
    const {userId} = res.data.data
    if(res.data.resultCode === ResultCode.OK) {
        dispatch(loginAC(userId))
        dispatch(authMe())
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    const res = await authAPI.logout()
    if(res.data.resultCode === ResultCode.OK) {
        const logoutData = {
            email: "",
            login: "",
            id: null
        }
        dispatch(authMeAC(logoutData))
    }
}

export const authMe = (): AppThunk => async dispatch => {
    const res = await authAPI.me()

    if(res.data.resultCode === ResultCode.OK) {
        dispatch(authMeAC(res.data.data))
        dispatch(fetchTodolists())
    } else {
        setErrorAC(res.data.messages[0])
    }
}