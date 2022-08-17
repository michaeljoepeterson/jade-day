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

export interface IAuthContext{
    user?: IUser | null;
    authToken?: string | null;
    loading: boolean;
    error?: any;
    loginWithEmail: (email: string, pass: string) => Promise<any>;
    createUserWithEmail: (email: string, pass: string) => Promise<any>;
}

const defaultContext: IAuthContext = {
    user: null,
    authToken: null,
    loading: false,
    error: null,
    loginWithEmail: async (email: string, pass: string) => null,
    createUserWithEmail: async (email: string, pass: string) => null
}

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider = ({
    children
}: any) => {
    const auth = getAuth(fbApp);
    const [user, setUser] = useState<IUser | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const listenForAuth = useCallback(() => {
        return auth.onAuthStateChanged(async (user) => {
            console.log('context: ',user);
            setLoading(true);
            if(!user){
                setLoading(false);
                return;
            }

            //const authToken = await user?.getIdToken();
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

    useEffect(() => {
        const listener = listenForAuth();
        return listener();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            authToken,
            loading,
            error,
            loginWithEmail,
            createUserWithEmail
        }}>
            {children}
        </AuthContext.Provider>
    )
}