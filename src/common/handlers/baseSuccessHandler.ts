import {AppDispatch} from "../../state/store";
import {setStatusAC} from "../../state/reducers/app-reducer/app-reducer";


// handle succeeded api request
export const baseSuccessHandler = <T>(dispatch: AppDispatch, actionCreator: Function, data: T) => {
    dispatch(actionCreator(data))
    dispatch(setStatusAC("succeeded"))
}