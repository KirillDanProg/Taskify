import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootAppType} from "../state/store";


export const useAppSelector: TypedUseSelectorHook<RootAppType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch