import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

interface InitialState {
  email: string;
  login: string;
  id: number | null;
  captchaUrl: string;
}

const initialState: InitialState = {
  email: "",
  login: "",
  id: null as number | null,
  captchaUrl: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getCaptcha.matchFulfilled,
      (state, { payload }) => {
        state.captchaUrl = payload.url;
      }
    );
  },
});
