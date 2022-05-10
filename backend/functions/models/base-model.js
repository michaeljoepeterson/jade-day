class BaseModel{
    constructor(){
        this.id = null;
    }

    /**
     * simple method to map data to the model
     * @param {*} data 
     */
    mapData(data){
        let props = Object.getOwnPropertyNames(this);
        props.forEach(prop => {
            if(data[prop] || data[prop] === 0 || typeof data[prop] === "boolean"){
                this[prop] = data[prop];
            }
        });
    }
}

module.exports = {BaseModel};