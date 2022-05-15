const { BaseDb } = require("./base-db");

class MemoryDb extends BaseDb{
    constructor(collectionName){
        super();
        this.collectionName = collectionName;
    }

    async createMemory(memory){
        try{
            let doc = await this.saveDoc(memory);
            return doc;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    async updateMemory(memory, id){
        try{
            let doc = await this.updateDocById(memory, id);
            return doc;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }
}

let memoryDb = new MemoryDb('memory');

module.exports = {memoryDb};