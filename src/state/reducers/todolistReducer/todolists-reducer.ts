import {AppStatusType, setErrorAC, setStatusAC} from "../app-reducer/app-reducer"
import {AppThunk} from "../../store";
import {ResultCode, todolistAPI} from "../../../api/todolists-api";
import {networkErrorsHandler, serverErrorsHandler} from "../../../common/handlers/errorHandler/error-handlers";
import {baseSuccessHandler} from "../../../common/handlers/baseSuccessHandler";

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
        case UPDATE_TODO_TITLE:
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        default:
            return state
    }
}


const FETCH_TODOLISTS = "FETCH-TODOLISTS"
const ADD_TODOLISTS = "ADD-TODOLISTS"
const DELETE_TODOLISTS = "DELETE-TODOLISTS"
const SET_ENTITY_STATUS = "SET-ENTITY-STATUS"
const UPDATE_TODO_TITLE = "UPDATE-TODO-TITLE"

type TodolistActionsType = ReturnType<typeof fetchTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof setEntityStatusAC>
    | ReturnType<typeof updateTodoTitleAC>

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
export const updateTodoTitleAC = (todolistId: string, title: string) => {
    return {
        type: UPDATE_TODO_TITLE,
        todolistId,
        title
    } as const
}

// thunks
export const fetchTodolists = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.fetchTodolists()
        baseSuccessHandler<TodolistType[]>(dispatch, fetchTodolistAC, res.data)
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
            baseSuccessHandler<TodolistType>(dispatch, addTodolistAC, res.data.data.item)
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
            baseSuccessHandler(dispatch, deleteTodolistAC, todolistId)
        }
    } catch (e) {
        networkErrorsHandler(dispatch, e, setErrorAC, setStatusAC)
    }
}


export const updateTodolistTC = (todolistId: string, value: string): AppThunk => async (dispatch) => {
    try {
        const res = await todolistAPI.updateTodoTitle(todolistId, value)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(updateTodoTitleAC(todolistId, value))
        }
    } catch (e) {
        networkErrorsHandler(dispatch, e, setErrorAC, setStatusAC)
    }
}