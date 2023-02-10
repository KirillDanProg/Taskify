import { apiSlice } from "../api/apiSlice";
import { ResponseType } from "../../api/todolists-api";
import { TodolistType } from "./todoSlice";


export const todoApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchTodoslists: build.query<TodolistType[], void>({
            query: () => "/todo-lists",
            providesTags: (result = []) => [
                { type: "Todo" as const  , id: "LIST" },
                ...result.map(todo => ({ type: "Todo" as const, id: todo.id }))
            ],
            transformResponse(response: TodolistType[]) {
                return response.map(todo => ({ ...todo, filter: "all", entityStatus: "idle" }))
            }
        }),
        addTodolist: build.mutation<ResponseType<{ item: TodolistType }>, string>({
            query: (title: string) => ({
                url: "/todo-lists",
                method: "POST",
                body: { title }
            }),
            invalidatesTags: [{type: "Todo", id: "LIST"}]
        }),
        deleteTodolist: build.mutation<ResponseType<{}>, string>({
            query: (todolistId) => ({
                url: `/todo-lists/${todolistId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, errors, args) => [{ type: 'Todo', id: args }]
        }),
        updateTodoTitle: build.mutation<{}, { todolistId: string, title: string }>({
            query: ({ todolistId, title }) => ({
                url: `/todo-lists/${todolistId}`,
                method: "PUT",
                body: { title }
            }),
            invalidatesTags: (result, errors, args) => [{ type: 'Todo', id: args.todolistId }]
        })
    })
})

export const {
    useFetchTodoslistsQuery,
    useAddTodolistMutation,
    useDeleteTodolistMutation,
    useUpdateTodoTitleMutation
} = todoApi