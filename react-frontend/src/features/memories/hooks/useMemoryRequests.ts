import axios from "axios";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";
import useImageUpload from "../../../firebase/hooks/useImageUpload";

export interface IMemoryRequests{
    createMemory: (memory: INewMemory, image?: File | null) => Promise<IMemory>;
    getMemories: () => Promise<IMemory[]>;
    updateMemory: (memory: IMemory, image?: File | null) => Promise<IMemory>;
}

/**
 * hook to provide available memory requests
 */
const useMemoryRequests = (): IMemoryRequests => {
    const memoryEndpoint = 'memory';
    const {getAuthHeaders, getUser} = useContext(AuthContext);
    const {uploadImage} = useImageUpload();
    const createMemory = useCallback(async (memory: INewMemory, image?: File | null) => {
        try{
            const authHeaders = getAuthHeaders();
            const response = await axios.post(`${apiUrl}${memoryEndpoint}`, {
                memory
            }, authHeaders);
            const data = response.data;
            const createdMemory: IMemory = {
                ...data.memory,
                date: new Date(data.memory.date)
            };
            if(image && createdMemory.id){
                await uploadImage(image, createdMemory.id);
            }
            return createdMemory;
        }
        catch(e){
            throw e;
        }
    }, [getAuthHeaders, getUser]);

    const getMemories = useCallback(async () => {
        try{
            let userMemories: IMemory[] = [];
            const authHeaders = getAuthHeaders();
            const user = getUser();
            if(!user){
                return userMemories;
            }
            const response = await axios.get(`${apiUrl}${memoryEndpoint}/${user.email}`, authHeaders);
            const data = response.data;
            const {memories} = data;
            memories.forEach((memory: IMemory) => userMemories.push({
                ...memory,
                date: memory.date ? new Date(memory.date) : new Date()
            }));
            return userMemories;
        }
        catch(e){
            throw e;
        }
    }, [getAuthHeaders, getUser]);

    const updateMemory = useCallback(async (memory: IMemory, image?: File | null) => {
        try{
            const authHeaders = getAuthHeaders();
            const response = await axios.put(`${apiUrl}${memoryEndpoint}/${memory.id}`, {
                memory
            }, authHeaders);
            const data = response.data;
            const createdMemory: IMemory = {
                ...data.memory,
                date: new Date(data.memory.date)
            };
            if(image && createdMemory.id){
                await uploadImage(image, createdMemory.id);
            }
            return createdMemory;
        }
        catch(e){
            throw e;
        }
    }, [getAuthHeaders, getUser]);

    return {
        createMemory,
        getMemories,
        updateMemory
    }
}

export default useMemoryRequests;