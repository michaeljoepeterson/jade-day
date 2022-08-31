import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../auth/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";

export interface IMemoryRequests{
    createMemory: (memory: INewMemory) => Promise<IMemory> 
}

/**
 * hook to provide available memory requests
 */
const useMemoryRequests = (): IMemoryRequests => {
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

    return {
        createMemory
    }
}

export default useMemoryRequests;