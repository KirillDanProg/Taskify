import {AppThunk} from "../../store";

export type AppThemeType = "light" | "dark"

type InitialAppThemeStateType = typeof initialState

const initialState = {
    theme: "light" as AppThemeType
}

export const themeReducer = (state: InitialAppThemeStateType = initialState, action: AppThemeActionType) => {
    switch (action.type) {
        case SET_APP_THEME:
            return {...state, theme: action.value}
        default:
            return state
    }
}

type AppThemeActionType = ReturnType<typeof setAppTheme>
const SET_APP_THEME = "SET-APP-THEME"


const setAppTheme = (value: AppThemeType) => {
    return {
        type: SET_APP_THEME,
        value
    } as const
}

export const saveAppThemeTC = (value: AppThemeType): AppThunk => dispatch => {
    localStorage.setItem("app-theme", value)
    dispatch(setAppTheme(value))
};
export const getAppThemeTC = (): AppThunk => dispatch => {
    const appTheme = localStorage.getItem("app-theme")
    if (appTheme) {
        dispatch(setAppTheme(appTheme as AppThemeType))
    }
}