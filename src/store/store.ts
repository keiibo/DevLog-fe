import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {},
});

// RootState型を定義
export type TRootState = ReturnType<typeof store.getState>;
// AppDispatch型を定義
export type TAppDispatch = typeof store.dispatch;

// 型付きフック
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
