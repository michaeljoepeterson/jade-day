import { IMemory } from "../../../models/memories/memory";

export interface IBaseMemoryProps{
    title?: string;
    subTitle?: string;
    memory?: IMemory;
    date?: Date;
}