import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tasksApi, UpdateTaskModelType} from "./tasksApi";
import { createAppAsyncThunk} from "../api/apiSlice";

export const updateTaskTC = createAppAsyncThunk("tasks/updateTask", async ({
                                                                               todolistId,
                                                                               taskId,
                                                                               model
                                                                           }: ArgType, thunkAPI) => {
    const task = thunkAPI.getState().tasks[todolistId].find(task => task.id === taskId)
    const updatedTask = {...task, ...model} as TaskType


})

export type TasksInitialStateType = {
    [key: string]: TaskType[]
}
const initialState = {} as TasksInitialStateType

export const taskSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(tasksApi.endpoints.fetchTasks.matchFulfilled, (state, action) => {
                action.payload.map(el => {
                    state[el.todoListId] = action.payload
                })
            })
    }
})

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ArgType = {
    todolistId: string,
    taskId: string,
    model: UpdateTaskModelType
}