import { RootAppType } from "common/app/store";

export const selectIsAuth = (state: RootAppType) => state.auth.id;
export const selectCaptchaUrl = (state: RootAppType) => state.auth.captchaUrl;
export const selectAuthError = (state: RootAppType) => state.auth.error;
