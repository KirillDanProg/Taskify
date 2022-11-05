import {AppThunk} from "../../store";
import {tasksAPI} from "../../../api/tasks-api";
import {ResultCode} from "../../../api/todolists-api";
import {setErrorAC, setStatusAC} from "../app-reducer/app-reducer";

export type TasksInitialStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

const initialState = {} as TasksInitialStateType

export const tasksReducer = (state: TasksInitialStateType = initialState, action: TaskActionsType): TasksInitialStateType => {
    switch (action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                [action.todolistId]: [...action.tasks]
            }
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]: [{...action.task}, ...state[action.todolistId]]
            }
        case DELETE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.updatedTask} : task)
            }
        default:
            return state
    }
}
// Actions types
type TaskActionsType = ReturnType<typeof fetchTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>

// actions variables
const FETCH_TASKS = "FETCH-TASKS"
const ADD_TASK = "ADD-TASK"
const DELETE_TASK = "DELETE-TASK"
const UPDATE_TASK = "UPDATE-TASK"

// action creators
export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: FETCH_TASKS,
        todolistId,
        tasks
    } as const
}

export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: ADD_TASK,
        task,
        todolistId
    } as const
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: DELETE_TASK,
        todolistId,
        taskId
    } as const
}

export const updateTaskAC = (todolistId: string, taskId: string, updatedTask: TaskType) => {
    return {
        type: UPDATE_TASK,
        todolistId,
        taskId,
        updatedTask
    } as const
}

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    const res = await tasksAPI.fetchTasks(todolistId)
    dispatch(fetchTasksAC(todolistId, res.data.items))
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    setStatusAC("loading")
    try {
        const res = await tasksAPI.addTask(todolistId, title)
        if (res.data.resultCode === ResultCode.OK) {
            const newTask = res.data.data.item
            dispatch(addTaskAC(todolistId, newTask))
        }
    } catch (e) {

    } finally {
        setStatusAC("idle")
    }

}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {

    try {
        const res = await tasksAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(deleteTaskAC(todolistId, taskId))
            dispatch(setStatusAC("succeeded"))
        }
    } catch (e) {
        if (typeof e === "string") {
            setErrorAC(e)
        } else if (e instanceof Error) {
            setErrorAC(e.message)
        }
        setStatusAC("failed")
    } finally {
        setStatusAC("idle")
    }

}