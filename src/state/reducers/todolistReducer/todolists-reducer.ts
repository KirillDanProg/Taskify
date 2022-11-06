import {AppStatusType, setErrorAC, setStatusAC} from "../app-reducer/app-reducer"
import {AppThunk} from "../../store";
import {ResultCode, todolistAPI} from "../../../api/todolists-api";
import {networkErrorsHandler, serverErrorsHandler} from "../../../errorHandler/error-handlers";

export type TodolistInitialStateType = typeof initialState

type FilterValuesType = "active" | "completed" | "all"

export type DomainTodolistType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: AppStatusType
}

export type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}
const initialState = [] as DomainTodolistType[]

export const todolistReducer = (state: TodolistInitialStateType = initialState, action: TodolistActionsType): DomainTodolistType[] => {
    switch (action.type) {
        case FETCH_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: "all", entityStatus: "idle"}))
        case ADD_TODOLISTS:
            return [
                {...action.todolist, filter: "all", entityStatus: "idle"},
                ...state
            ]
        case DELETE_TODOLISTS:
            return state.filter(todo => todo.id !== action.todolistId)
        case SET_ENTITY_STATUS:
            return state.map(todo => todo.id === action.todolistId
                ? {...todo, entityStatus: action.value}
                : todo)
        default:
            return state
    }
}


const FETCH_TODOLISTS = "FETCH-TODOLISTS"
const ADD_TODOLISTS = "ADD-TODOLISTS"
const DELETE_TODOLISTS = "DELETE-TODOLISTS"
const SET_ENTITY_STATUS = "SET-ENTITY-STATUS"

type TodolistActionsType = ReturnType<typeof fetchTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setEntityStatusAC>

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

export const setEntityStatusAC = (todolistId: string, value: AppStatusType) => {
    return {
        type: SET_ENTITY_STATUS,
        todolistId,
        value
    } as const
}

// thunks
export const fetchTodolists = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.fetchTodolists()
        dispatch(fetchTodolistAC(res.data))
        dispatch(setStatusAC("succeeded"))

    } catch (e) {
        dispatch(setStatusAC("failed"))
    } finally {
        setStatusAC("idle")
    }

}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.addTodolist(title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTodolistAC(res.data.data.item))
        } else {
            serverErrorsHandler(res.data.messages[0], dispatch)
        }
    } catch (e) {
        networkErrorsHandler(dispatch, e, setErrorAC, setStatusAC)
    } finally {
        setStatusAC("idle")
    }
}

export const deleteTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(deleteTodolistAC(todolistId))
        }
    } catch {

    }
}
