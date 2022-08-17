import { createContext, useEffect, useState } from "react";
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

export interface IAuthContext{
    user?: IUser | null;
    authToken?: string | null;
    loading: boolean;
    error?: any;
}

const initialState: IAuthContext = {
    user: null,
    authToken: null,
    loading: false,
    error: null
}

const AuthContext = createContext<IAuthContext>(initialState);

export const AuthProvider = ({
    children
}: any) => {
    const auth = getAuth(fbApp);
    const [authState, setAuthState] = useState<IAuthContext>(initialState);

    const listenForAuth = () => {
        return auth.onAuthStateChanged((user) => console.log('context: ',user));
    }

    useEffect(() => {
        const listener = listenForAuth();
        return listener();
    }, []);

    return (
        <AuthContext.Provider
        value={authState}>
            {children}
        </AuthContext.Provider>
    )
}