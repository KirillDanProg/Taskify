import { type RootAppType, type AppDispatch } from "app/store";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootAppType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
