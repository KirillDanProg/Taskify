import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../features/api/apiSlice";
import { taskSlice } from "../../features/tasks/taskSlice";
import { todoSlice } from "../../features/todos/todoSlice";
import { authSlice } from "../../features/auth/authSlice";
import { appSlice } from "./appSlice";

const rootReducer = combineReducers({
  todolist: todoSlice.reducer,
  tasks: taskSlice.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootAppType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootAppType, unknown, AnyAction>;

export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootAppType,
  unknown,
  AnyAction
>;
