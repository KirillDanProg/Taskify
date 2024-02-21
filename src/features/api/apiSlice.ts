import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type RootAppType, type AppDispatch } from "app/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-network.samuraijs.com/api/1.1",
    credentials: "include",
    headers: {
      "API-KEY": "32d98f46-bc75-48b0-80ba-428435a33c43",
    },
  }),
  // eslint-disable-next-line no-unused-vars
  endpoints: build => ({}),
  tagTypes: ["Todo", "Task", "Auth"],
});

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootAppType;
  dispatch: AppDispatch;
}>();
