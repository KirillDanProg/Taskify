import { type RootAppType, type AppDispatch } from "app/store";
import {
  type AsyncThunk,
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
export type SortType = "asc" | "desc" | null;
const initialState = {
  error: null,
  status: "idle" as StatusType,
  isInitialized: false,
  theme: "light" as ThemeType,
  filter: {
    sort: null as SortType,
  },
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
    setFilterSort: (state, { payload }: PayloadAction<{ sort: SortType }>) => {
      state.filter.sort = payload.sort;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(themeToggleThunk.fulfilled, state => {
        state.theme = state.theme === "dark" ? "light" : "dark";
      })
      .addCase(appInit.fulfilled, (state, action) => {
        state.theme = action.payload as ThemeType;
      })
      .addMatcher(
        action => action.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          if (payload && payload.messages?.length > 0) {
            state.error = payload.messages[0];
            state.status = "failed";
          } else {
            state.status = "succeeded";
            state.error = null;
          }
        }
      )
      .addMatcher(
        action => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload.error;
        }
      );
  },
});

export const { resetError, setFilterSort } = appSlice.actions;

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type StatusType = "idle" | "succeeded" | "failed" | "loading";

type ThemeType = "dark" | "light";
export interface ThunkApiType {
  state: RootAppType;
  dispatch: AppDispatch;
}

export const themeToggleThunk = createAsyncThunk<void, void, ThunkApiType>(
  "app/themeToggle",
  (_, thunkAPI) => {
    const theme = thunkAPI.getState().app.theme;
    const invertedTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", invertedTheme);
  }
);

export const appInit = createAsyncThunk("app/init", () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme || "light";
});
