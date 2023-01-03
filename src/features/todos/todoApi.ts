import {apiSlice} from "../api/apiSlice";
import {ResponseType} from "../../api/todolists-api";
import {TodolistType} from "./todoSlice";


export const todoApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchTodoslists: build.query<TodolistType[], void>({
            query: () => "/todo-lists",
            providesTags: ["Todo"],
            transformResponse(response: TodolistType[]) {
                return response.map(todo => ({...todo, filter: "all", entityStatus: "idle"}))
            }
        }),
        addTodolist: build.mutation<ResponseType<{ item: TodolistType }>, string>({
            query: (title: string) => ({
                url: "/todo-lists",
                method: "POST",
                body: {title}
            }),
            invalidatesTags: ["Todo"]
        }),
        deleteTodolist: build.mutation<ResponseType<{}>, string>({
            query: (todolistId) => ({
                url: `/todo-lists/${todolistId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todo"]
        }),
        updateTodoTitle: build.mutation<TodolistType, {todolistId: string, title: string}>({
            query: ({todolistId, title}) => ({
                url: `/todo-lists/${todolistId}`,
                method: "PUT",
                body: {title}
            }),
            invalidatesTags: ["Todo"]
        })
    })
})

export const {
    useFetchTodoslistsQuery,
    useAddTodolistMutation,
    useDeleteTodolistMutation,
    useUpdateTodoTitleMutation
} = todoApi