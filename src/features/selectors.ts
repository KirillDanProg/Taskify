import {RootAppType} from "../state/store";

// app selectors
export const selectCurrentStatus = (state: RootAppType) => state.app.status
export const selectCurrentTheme = (state: RootAppType) => state.app.theme
export const selectError = (state: RootAppType) => state.app.error

// auth selectors
export const selectIsAuth = (state: RootAppType) => state.auth.id
export const selectCaptchaUrl = (state: RootAppType) => state.auth.captchaUrl