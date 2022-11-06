import {AppDispatch} from "../state/store";
import {setErrorAC} from "../state/reducers/app-reducer/app-reducer";

export const serverErrorsHandler = (message: string, dispatch: AppDispatch) => {
    dispatch(setErrorAC(message))
}

export const networkErrorsHandler = (dispatch: AppDispatch,
                                     error: any,
                                     setAppErrorAC: any,
                                     setAppStatusAC: any,

) => {
    if (typeof error === "string") {
        dispatch(setAppErrorAC(error))
    } else if (error instanceof Error) {
        dispatch(setAppErrorAC(error.message))
    }
    dispatch(setAppStatusAC("failed"))
}