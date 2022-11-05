import {AppDispatch, RootAppType} from "../state/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const useAppSelector: TypedUseSelectorHook<RootAppType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch