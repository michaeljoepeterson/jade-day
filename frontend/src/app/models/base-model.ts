/**
 * base model for app data models
 */
 export class BaseModel{
    _id: string|null = null;
    get id(): string|null{
        return this._id;
    }
    set id(idVal: string|null){
        this._id = idVal;
    }

    constructor(){

    }

    /**
     * base agnostic data initialization for all app models
     * @param any data 
     */
    init(data: any){
        let keys = Object.keys(this);
        let dataKeys = Object.keys(data);
        let keyLookup: any = {};
        dataKeys.forEach((key: any) => {
            keyLookup[key] = key;
        });
        keys.forEach((key: any) => {
            if(data[key] || data[key] === 0 || typeof data[key] === "boolean"){
                this[key as keyof BaseModel] = data[key];
            }
            else if(key === '_id'){
                this.id = data._id || data.id;
            }
        });
    }

    /**
     * base serialize props and values for saving to db and returning data
     * @returns 
     */
    serialize():any{
        let keys = Object.keys(this);
        let data:any = {};
        keys.forEach(key => {
            let value: any = this[key as keyof BaseModel];
            if(typeof value !== 'function' && (value || value === 0 || typeof value === "boolean")){
                data[key] = value;
            }
        });
        data.id = this._id;
        return data;
    }
}