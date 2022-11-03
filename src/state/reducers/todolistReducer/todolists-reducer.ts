export type TodolistInitialStateType = typeof initialState

type FilterValuesType =  "active" | "completed" | "all"

export type DomainTodolistType = TodolistType & { filter: FilterValuesType }

type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}
const initialState = [] as DomainTodolistType[]

export const todolistReducer = (state: TodolistInitialStateType = initialState, action: TodolistActions): DomainTodolistType[] => {
    switch (action.type) {
        case FETCH_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: "all"}))
        case ADD_TODOLISTS:
            return [
                {...action.todolist, filter: "all"},
                ...state
            ]
        case DELETE_TODOLISTS:
            return state.filter(todo => todo.id !== action.todolistId)

        default:
            return state
    }
}


const FETCH_TODOLISTS = "FETCH-TODOLISTS"
const ADD_TODOLISTS = "ADD-TODOLISTS"
const DELETE_TODOLISTS = "DELETE-TODOLISTS"

type TodolistActions = ReturnType<typeof fetchTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>

export const fetchTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: FETCH_TODOLISTS,
        todolists
    } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: ADD_TODOLISTS,
        todolist
    } as const
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: DELETE_TODOLISTS,
        todolistId
    } as const
}

