import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./authApi";

const initialState = {
    email: "",
    login: "",
    id: null as number | null,
    captchaUrl: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, {payload}) => {
            state.email = payload.data.email
            state.login = payload.data.login
            state.id = payload.data.id
        })
    }
})

export type InitialStateType = typeof initialState

export type LoginDataType = {
    email: string
    password: string
    captcha?: string
}