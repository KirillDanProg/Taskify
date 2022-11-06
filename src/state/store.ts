import {AnyAction, applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {tasksReducer} from "./reducers/taskReducer/tasks-reducer";
import {todolistReducer} from "./reducers/todolistReducer/todolists-reducer";
import {appReducer} from "./reducers/app-reducer/app-reducer";
import {authReducer} from "./reducers/auth-reducer/auth-reduser";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootAppType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootAppType, unknown, AnyAction>

export type AppThunk<ReturnType = any> = ThunkAction<
    ReturnType,
    RootAppType,
    unknown,
    AnyAction>

// @ts-ignore
window.store = store