import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootAppType} from "../../state/store";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://social-network.samuraijs.com/api/1.1",
        credentials: "include",
        headers: {
            "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
        }
    }),
    endpoints: (build) => ({}),
    tagTypes: ['Todo', 'Task', "Auth"],
})

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootAppType
    dispatch: AppDispatch
}>()