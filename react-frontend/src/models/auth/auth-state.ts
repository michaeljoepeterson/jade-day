import { IUser } from "../user";

export interface IAuthState{
    user?: IUser;
    authToken?: string
    loading: boolean;
    error?: any;
}
