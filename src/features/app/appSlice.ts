import {AsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    error: null,
    status: "idle" as StatusType,
    isInitialized: false,
    theme: "light" as ThemeType
}
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        themeToggle: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark"
        },
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/fulfilled"),
                (state, {payload}) => {
                    if(payload.messages?.length > 0) {
                        state.error = payload.messages[0]
                        state.status = "failed"
                    } else {
                        state.status = "succeeded";
                        state.error = null;
                    }
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.payload.data.error;
                }
            )
    }

})

export const {themeToggle, resetError} = appSlice.actions

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type StatusType = "idle" | "succeeded" | "failed" | "loading"
type ThemeType = "dark" | "light"
