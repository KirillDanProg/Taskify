import { type RootAppType } from "app/store";

export const selectCaptchaUrl = (state: RootAppType) => state.auth.captchaUrl;
