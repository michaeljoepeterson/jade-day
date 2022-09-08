import axios from "axios";
import { apiUrl } from "../../../config";
import { IMemory } from "../../../models/memories/memory";
import { INewMemory } from "../../../models/memories/new-memory";

export class MemoryApi{
    apiUrl: string | null = null;
    memoryEndpoint: string = 'memory';

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }

    async createMemory(memory: INewMemory, authHeaders: any): Promise<IMemory> {
        try{
            const response = await axios.post(`${this.apiUrl}${this.memoryEndpoint}`, {
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
    }

    async getMemories(authHeaders: any, email: string): Promise<IMemory[]>{
        try{
            let userMemories: IMemory[] = [];
            const response = await axios.get(`${apiUrl}${this.memoryEndpoint}/${email}`, authHeaders);
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
    }

    async updateMemory(memory: IMemory, authHeaders: any): Promise<IMemory>{
        try{
            const response = await axios.put(`${this.apiUrl}${this.memoryEndpoint}/${memory.id}`, {
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
    }
}

const memoryApi = new MemoryApi(apiUrl as string);

export default memoryApi;