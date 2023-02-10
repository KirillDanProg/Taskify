import { RootAppType, AppDispatch } from 'state/store';
import { AsyncThunk, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(themeToggleThunk.fulfilled, (state) => {
                state.theme = state.theme === "dark" ? "light" : "dark"
            })
            .addCase(appInit.fulfilled, (state, action) => {
                state.theme = action.payload as ThemeType
            })
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action): action is GenericAsyncThunk => action.type.endsWith("/fulfilled"),
                (state, { payload }) => {
                    if (payload && payload.messages?.length > 0) {
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

export const { resetError } = appSlice.actions

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type StatusType = "idle" | "succeeded" | "failed" | "loading"

type ThemeType = "dark" | "light"
export type ThunkApiType = {state: RootAppType, dispatch: AppDispatch}

export const themeToggleThunk = createAsyncThunk<void, void, ThunkApiType>("app/themeToggle", (_, thunkAPI) => {
    const theme = thunkAPI.getState().app.theme
    const invertedTheme = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", invertedTheme)
})


export const appInit = createAsyncThunk("app/init", () => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme : "light"
})
