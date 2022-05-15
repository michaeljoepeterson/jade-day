const { BaseModel } = require("./base-model");

class User extends BaseModel{
    constructor(data){
        super();
        this.email = null;
        this.role = null;
        this.canView = false;
        this.tokens = 0;

        if(data){
            this.mapData(data);
        }
    }
}

module.exports = {User};