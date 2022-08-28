import { createContext, useCallback, useEffect, useState } from "react";
import { IUser } from "../models/user";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    connectAuthEmulator
} from "firebase/auth";
import { fbApp } from "../firebase/fb";
import axios from "axios";
import { apiUrl } from "../config";

export interface IAuthState{
    user: IUser | null;
    authToken: string | null;
    loading: boolean;
    error: any;
}

export interface IAuthContext{
    user?: IUser | null;
    authToken?: string | null;
    loading: boolean;
    error?: any;
    loginWithEmail: (email: string, pass: string) => Promise<any>;
    createUserWithEmail: (email: string, pass: string) => Promise<any>;
    loginWithGoogle: () => Promise<any>;
    logout: () => Promise<any>;
    authState: IAuthState;
    isLoggedIn: () => boolean;
    getAuthHeaders: () => any;
}


export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const googleAuthProvider = new GoogleAuthProvider();

export const AuthProvider = ({
    children
}: any) => {
    const auth = getAuth(fbApp);
    const [authState, setAuthState] = useState<IAuthState>({
        user: null,
        authToken: null,
        loading: true,
        error: null
    });

    const listenForAuth = useCallback(() => {
        if(process.env.NODE_ENV !== 'production'){
            connectAuthEmulator(auth, "http://localhost:9099");
        }
        return auth.onAuthStateChanged(async (user) => {
            console.log('context: ',user);
            setAuthState({
                ...authState,
                loading: true
            });
            if(!user){
                setAuthState({
                    ...authState,
                    loading: false,
                    user: null,
                    authToken: null,
                    error: null
                });
                return;
            }
            const authToken = await user?.getIdToken();
            const appUser = await checkAppUser(user.email as string);
            setAuthState({
                ...authState,
                loading: false,
                user: appUser,
                authToken: authToken,
                error: null
            });
        });
    }, []);

    const loginWithEmail = useCallback(async (email: string, pass: string) => {
        try{
            await signInWithEmailAndPassword(auth, email, pass);
        }
        catch(e){
            throw e;
        }
    }, []);

    const createUserWithEmail = useCallback(async (email: string, pass: string) => {
        try{
            await createUserWithEmailAndPassword(auth, email, pass);
        }
        catch(e){
            throw e;
        }
    }, []);

    const loginWithGoogle = useCallback(async () => {
        try{
            return signInWithPopup(auth, googleAuthProvider);
          }
          catch(e){
            throw e;
          }
    }, []);

    const logout = useCallback(async () => {
        try{
            await signOut(auth);
        }
        catch(e){
            console.warn(e);
        }
    }, []);

    const isLoggedIn = useCallback(() => {
        return authState?.user?.email && authState?.authToken ? true : false
    }, [authState]);

    const getAuthHeaders = useCallback(() => {
        const {authToken} = authState;
        if(authToken){
            return {
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            }
        }
        return {};
    }, [authState])

    /**
     * get/create the app user
     * @param email
     * @returns
     */
    const checkAppUser = async (email: string) => {
        try{
            const url = `${apiUrl}users/check`;
            const res = await axios.post(url, {
                user:{
                    email
                }
            });
            return res.data?.user;
        }
        catch(e){
            throw e;
        }
    }

    useEffect(() => {
        const listener = listenForAuth();
        return () => listener();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user: authState.user,
            authToken: authState.authToken,
            loading: authState.loading,
            error: authState.error,
            loginWithEmail,
            createUserWithEmail,
            loginWithGoogle,
            logout,
            authState,
            isLoggedIn,
            getAuthHeaders
        }}>
            {children}
        </AuthContext.Provider>
    )
}