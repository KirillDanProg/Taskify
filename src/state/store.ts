import {AnyAction, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {ThunkAction} from "redux-thunk";
import {tasksReducer} from "./reducers/taskReducer/tasks-reducer";
import {todolistReducer} from "./reducers/todolistReducer/todolists-reducer";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer
})

const store = createStore(rootReducer)

export type RootAppType = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootAppType,
    unknown,
    AnyAction>