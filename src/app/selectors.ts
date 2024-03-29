import { type RootAppType } from "./store";

// app selectors
export const selectCurrentStatus = (state: RootAppType) => state.app.status;
export const selectCurrentTheme = (state: RootAppType) => state.app.theme;
export const selectAppError = (state: RootAppType) => state.app.error;
export const selectAppFilterSort = (state: RootAppType) => state.app.filter.sort;
