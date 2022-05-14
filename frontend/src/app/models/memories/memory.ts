import { BaseModel } from "../base-model";

/**
 * class for the memory recieved from the server and for rendering data
 */
export class Memory extends BaseModel{
    date: Date = null;
    summary: string = null;
    description: string = null;
    image: string = null;
    
    constructor(data: any){
        super();
        if(data){
            this.initMemory(data);
        }
    }

    initMemory(data: any){
        this.init(data);
        if(data.date){
            this.date = new Date(data.date);
        }
    }
}