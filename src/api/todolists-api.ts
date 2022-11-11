import {TodolistType} from "../state/reducers/todolistReducer/todolists-reducer";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
    }
})

export const todolistAPI = {

    fetchTodolists: () => {
        return instance.get<TodolistType[]>("/todo-lists")
    },
    addTodolist: (title: string) => {
        return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists/`, {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle: (todolistId: string, title: string) => {
        return instance.put(`/todo-lists/${todolistId}`, {title})
    }

}

export type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export enum ResultCode {
    OK= 0,
    FAILED = 1,
    CAPTCHA = 10
}