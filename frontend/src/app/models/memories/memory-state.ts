import { Memory } from "./memory";

export interface IMemoryState{
    loading: boolean;
    memories: Memory[];
    error: any;
}