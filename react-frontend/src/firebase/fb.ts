import { fbConfig } from "../config";
import { initializeApp } from "firebase/app";

export const fbApp = initializeApp(fbConfig);