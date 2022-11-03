import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "79813bfe-0555-4e37-9ff1-f0fc4c64bc6c"
    }
})

const todolistAPI = {
    fetchTodolists: () => {
       return instance.get(" /todo-lists")
    },
    addTodolist: (title: string) => {
        return instance.post(`/todo-lists/`, {title})
    }
}

const tasksAPI = {

}