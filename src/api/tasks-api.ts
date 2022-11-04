import axios from "axios";
import {TaskType} from "../state/reducers/taskReducer/tasks-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "1c9ef8d9-3ac4-4a66-8576-25dfbcc182dd"
    }
})


const tasksAPI = {
    fetchTasks: (todolistID: string) => {
      return instance.get(`/todo-lists/${todolistID}/tasks`)
    },
    addTask: (todolistId: string, task: TaskType) => {
        return instance.post(`/todo-lists/${todolistId}`, {...task})
    }

}