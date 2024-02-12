import { RootAppType, AppDispatch } from "common/app/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootAppType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
