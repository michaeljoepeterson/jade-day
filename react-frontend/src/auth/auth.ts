import { fbConfig } from "../config";
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

const app = initializeApp(fbConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let listener: any = null;

export const listenForAuth = () => {
    if(process.env.NODE_ENV !== 'production'){
        connectAuthEmulator(auth, "http://localhost:9099");
    }
    if(listener){
        listener();
    }
    listener = auth.onAuthStateChanged((user) => console.log('user', user));
}

export const loginWithEmail = (email: string, pass: string) => {

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

export const logout = () => {
    signOut(auth);
}

const checkAppUser = (email: string) => {

}
