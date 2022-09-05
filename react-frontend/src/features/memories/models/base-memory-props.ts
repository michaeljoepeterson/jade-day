import { IMemory } from "../../../models/memories/memory";

export interface IBaseMemoryModalProps{
    title?: string;
    subTitle?: string;
    memory?: IMemory | null;
    date?: Date;
    imageUrl?: string | null;
}