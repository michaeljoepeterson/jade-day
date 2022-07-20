import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/state/auth-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

console.log(store.getState());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;