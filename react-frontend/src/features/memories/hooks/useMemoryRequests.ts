import axios from "axios";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";
import useImageUpload from "../../../firebase/hooks/useImageUpload";
import memoryApi from "../models/memory-api";

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
            const createdMemory: IMemory = await memoryApi.createMemory(memory, authHeaders);
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
            const user = getUser();
            if(!user){
                return [];
            }
            const authHeaders = getAuthHeaders();
            let userMemories: IMemory[] = await memoryApi.getMemories(authHeaders, user.email as string);
            return userMemories;
        }
        catch(e){
            throw e;
        }
    }, [getAuthHeaders, getUser]);

    const updateMemory = useCallback(async (memory: IMemory, image?: File | null) => {
        try{
            const authHeaders = getAuthHeaders();
            const createdMemory: IMemory = await memoryApi.updateMemory(memory, authHeaders);
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