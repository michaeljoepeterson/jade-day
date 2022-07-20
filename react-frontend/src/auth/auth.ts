import { apiUrl, fbConfig } from "../config";
import { initializeApp } from "firebase/app";
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
import axios from "axios";
import { IUser } from "../models/user";
import { Dispatch } from "@reduxjs/toolkit";
import { loadingAuth, setUserData, setUserError } from "./state/auth-slice";

const app = initializeApp(fbConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let listener: any = null;
//using this method let this pipeline handle the auth flow
//could change to have a function check auth that checks the auth.currentUser and is only called on app init
export const listenForAuth = (dispatch: Dispatch) => {
    if(process.env.NODE_ENV !== 'production'){
        connectAuthEmulator(auth, "http://localhost:9099");
    }
    if(listener){
        listener();
    }
    listener = auth.onAuthStateChanged(async (user) => {
        try{
            dispatch(loadingAuth({
                loading: true
            }));
            console.log('user', user);
            if(!user){
                dispatch(loadingAuth({
                    loading: false
                }));
                return;
            }
            const authToken = await user?.getIdToken();
            //get the app user
            const appUser = await checkAppUser(user.email as string);
            console.log('found app user', user);
            dispatch(setUserData({
                user: {
                    email: user.email
                },
                authToken
            }));
        }
        catch(e){
            console.warn('error checking user', e);
            dispatch(setUserError(e));
            throw e;
        }
    });
}

export const loginWithEmail = async (email: string, pass: string) => {
    try{
        await signInWithEmailAndPassword(auth, email, pass);
    }
    catch(e){
        throw e;
    }
}

export const createUserWithEmail = async (email: string, pass: string) => {
    try{
        await createUserWithEmailAndPassword(auth, email, pass);
    }
    catch(e){
        console.warn(e);
        throw e;
    }
}

export const loginWithGoogle = () => {

}

export const logout = async () => {
    try{
        await signOut(auth);
    }
    catch(e){
        throw e;
    }
}

/**
 * get/create the app user
 * @param email
 * @returns
 */
export const checkAppUser = async (email: string) => {
    try{
        const url = `${apiUrl}users/check`;
        const res = await axios.post(url, {
            user:{
                email
            }
        });
        console.log(res);
        return res.data?.user;
    }
    catch(e){
        throw e;
    }
}
