export type AppInitialStateType = typeof initialState
export type AppStatusType = "idle" | "succeeded" | "failed" | "loading"

const initialState = {
    status: "idle" as AppStatusType,
    error: null as string | null
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return {...state, status: action.status}
        case CHANGE_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// action type variables
export const CHANGE_APP_STATUS = "CHANGE-APP-STATUS"
export const CHANGE_APP_ERROR = "CHANGE-APP-ERROR"

//action types
type AppActionsType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>

//action creators
export const setStatusAC = (status: AppStatusType) => {
    return {
        type: CHANGE_APP_STATUS,
        status
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: CHANGE_APP_ERROR,
        error
    } as const
}