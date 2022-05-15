const { BaseModel } = require("./base-model");

class Memory extends BaseModel{
    constructor(data){
        super();
        this.date = null;
        this.summary = null;
        this.description = null;
        this.creator = null;

        if(data){
            this.mapData(data);
        }
    }
}

module.exports = {Memory};