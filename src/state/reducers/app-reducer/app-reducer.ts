import {AppThunk} from "../../store";
import {fetchTodolists} from "../todolistReducer/todolists-reducer";
import {authMe} from "../auth-reducer/auth-reduser";

export type AppInitialStateType = typeof initialState
export type AppStatusType = "idle" | "succeeded" | "failed" | "loading"

const initialState = {
    status: "loading" as AppStatusType,
    error: null as string | null,
    isInitialized: false,
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return {...state, status: action.status}
        case CHANGE_APP_ERROR:
            return {...state, error: action.error}
        case APP_INITIALIZING:
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// action type variables
export const CHANGE_APP_STATUS = "CHANGE-APP-STATUS"
export const CHANGE_APP_ERROR = "CHANGE-APP-ERROR"
export const APP_INITIALIZING = "APP-INITIALIZING"

//action types
type AppActionsType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof appInitializing>
//action creators
export const setStatusAC = (status: AppStatusType) => {
    return {
        type: CHANGE_APP_STATUS,
        status
    } as const
}
export const setErrorAC = (error: string | null) => {
    return {
        type: CHANGE_APP_ERROR,
        error
    } as const
}

export const appInitializing = (value: boolean) => {
    return {
        type: APP_INITIALIZING,
        value
    } as const
}

//thunks

export const initializeAppTC = (): AppThunk => async dispatch => {
    dispatch(fetchTodolists())
    dispatch(authMe())
}
