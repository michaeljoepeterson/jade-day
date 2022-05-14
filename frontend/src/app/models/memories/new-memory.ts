/**
 * interface for data sent to the server for creating a new memory
 */
export interface INewMemory{
    date: Date;
    summary: string;
    description: string;
    image: any;
}