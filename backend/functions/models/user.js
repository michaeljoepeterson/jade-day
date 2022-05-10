const { BaseModel } = require("./base-model");

class User extends BaseModel{
    constructor(data){
        super();
        this.email = null;
        this.isJW = false;
        this.isMP = false;
        this.canView = false;
        this.tokens = 0;

        if(data){
            this.mapData(data);
        }
    }
}

module.exports = {User};