import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../auth/auth.context";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";

export interface IMemoryRequests{
    createMemory: (memory: INewMemory) => Promise<IMemory>;
    uploadImage: (file: File) => Promise<any>;
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
            throw e;
        }
    };

    const uploadImage = async (image: File) => {
        try{
            const formData = new FormData();
            formData.append('image', image, image.name);
            const authHeaders = getAuthHeaders();
            authHeaders.headers['Content-Type'] = 'multipart/form-data';
            console.log(authHeaders);
            const response = await axios.post(`${apiUrl}/memory/image/testid`, formData, authHeaders);
            console.log(response.data);
            return response.data;
        }
        catch(e){
            throw e;
        }
    }

    return {
        createMemory,
        uploadImage
    }
}

export default useMemoryRequests;