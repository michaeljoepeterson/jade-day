import { BaseModel } from "../base-model";

export class User extends BaseModel{
    email: string|null = null;
    
    constructor(data?: any){
        super()
        if(data){
            this.initUser(data);
        }
    }

    initUser(data:any){
        this.init(data);
    }
}