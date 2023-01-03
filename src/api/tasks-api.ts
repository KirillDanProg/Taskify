import axios from "axios";
import {ResponseType} from "./todolists-api";
import {TaskType} from "../features/tasks/taskSlice";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
    }
})


export const tasksAPI = {
    fetchTasks: (todolistId: string) => {
      return instance.get<{items: TaskType[], error: string}>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask: (todolistId: string, title: string) => {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, task: TaskType) => {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
    }

}
