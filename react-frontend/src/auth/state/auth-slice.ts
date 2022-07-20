import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { IAuthState } from "../../models/auth/auth-state";
import { IUser } from "../../models/user";
import { checkAppUser, createUserWithEmail, logout } from "../auth";

const initialState: IAuthState = {
    user: undefined,
    authToken: undefined,
    loading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loadingAuth: (state, action) => {
            return {
                ...state,
                loading: action.payload.loading,
                error: undefined
            }
        },
        setUserData: (state, action) => {
            //state.user = action.payload.user;
            console.log('action', action);
            return {
                ...state,
                user: action.payload?.user,
                authToken: action.payload?.authToken,
                loading: false,
                error: undefined
            }
        },
        setUserError: (state, action) => {
            return {
                ...state,
                user: undefined,
                authToken: undefined,
                loading: false,
                error: action.payload?.error
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: undefined,
                authToken: undefined,
                loading: false,
                error: undefined
            }
        }
    }
});

export const authReducer = authSlice.reducer;
export const {loadingAuth, setUserData, setUserError, logoutUser} = authSlice.actions;
//not needed
export const createUserWithEmailAction = (email: string, pass: string) => async (dispatch: Dispatch) => {
    try{
        const res = await createUserWithEmail(email, pass);
        console.log('res', res);
        const userData = await checkAppUser(email);
        console.log('userData', userData);
        dispatch(setUserData({
            user: {
                email
            }
        }));
    }
    catch(e){
        console.warn(e);
        dispatch(setUserError(e));
    }
}

export const loginUserWithEmailAction = (email: string, pass: string) => async (dispatch: Dispatch) => {
    try{

    }
    catch(e){
        console.warn(e);
        dispatch(setUserError(e));
    }
}

export const logoutAction = () => async (dispatch: Dispatch) => {
    try{
        await logout();
        dispatch((logoutUser()));
    }
    catch(e){
        console.warn(e);
        dispatch(setUserError(e));
    }
}

//selectors
export const selectIsLoggedIn = (state: any): boolean => state?.auth.user ? true : false;

export const selectUser = (state: any): IUser | undefined => state?.auth.user;

export const selectAuthtoken = (state: any): string | undefined => state?.auth.authToken;

export const selectAuthLoading = (state: any): string | undefined => state?.auth.loading;