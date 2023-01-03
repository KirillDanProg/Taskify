import {createSlice} from "@reduxjs/toolkit";
import {StatusType} from "../app/appSlice";


const initialState = [] as TodolistType[]

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {}
})

export type FilterValuesType = "active" | "completed" | "all"
export type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number,
    filter: FilterValuesType,
    entityStatus: StatusType
}