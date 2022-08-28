import axios from "axios";
import { PropsWithChildren, createContext, useCallback, useContext } from "react";
import { AuthContext } from "../../../auth/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";

export interface IMemoryContext{
    createMemory: (memory: INewMemory) => Promise<IMemory> 
}

export const MemoryContext = createContext<IMemoryContext>({} as IMemoryContext);

export const MemoryProvider = ({
    children
}: PropsWithChildren<any>) => {
    const {getAuthHeaders} = useContext(AuthContext);

    const createMemory = async (memory: INewMemory) => {
        try{
            const authHeaders = getAuthHeaders();
            const response = await axios.post(`${apiUrl}/memory`, {
                memory
            }, authHeaders);
            const data = response.data;
            return data.memory;
        }
        catch(e){
            console.warn(e);
            throw e;
        }
    };

    return (
        <MemoryContext.Provider
        value={{
            createMemory
        }}>
            {children}
        </MemoryContext.Provider>
    );
}