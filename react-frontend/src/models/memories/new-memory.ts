import { IMemory } from "./memory";

//export type INewMemory = Omit<IMemory, 'id'>;

export type INewMemory = Pick<IMemory, 'description' | 'summary'> & {
    date?: Date | null;
};