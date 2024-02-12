import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootAppType, AppDispatch } from "common/app/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-network.samuraijs.com/api/1.1",
    credentials: "include",
    headers: {
      "API-KEY": "32d98f46-bc75-48b0-80ba-428435a33c43",
    },
  }),
  endpoints: (build) => ({}),
  tagTypes: ["Todo", "Task", "Auth"],
});

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootAppType;
  dispatch: AppDispatch;
}>();
