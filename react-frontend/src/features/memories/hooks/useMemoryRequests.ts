import axios from "axios";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";

export interface IMemoryRequests{
    createMemory: (memory: INewMemory) => Promise<IMemory>;
    uploadImage: (file: File) => Promise<any>;
    getMemories: () => Promise<IMemory[]>;
}

/**
 * hook to provide available memory requests
 */
const useMemoryRequests = (): IMemoryRequests => {
    const memoryEndpoint = 'memory';
    const {getAuthHeaders, getUser} = useContext(AuthContext);
    const createMemory = useCallback(async (memory: INewMemory) => {
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
            return createdMemory;
        }
        catch(e){
            throw e;
        }
    }, [getAuthHeaders, getUser]);

    const uploadImage = useCallback(async (image: File) => {
        try{
            const formData = new FormData();
            formData.append('image', image, image.name);
            const authHeaders = getAuthHeaders();
            authHeaders.headers['Content-Type'] = 'multipart/form-data';
            const response = await axios.post(`${apiUrl}${memoryEndpoint}/image/testid`, formData, authHeaders);
            return response.data;
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

    return {
        createMemory,
        uploadImage,
        getMemories
    }
}

export default useMemoryRequests;