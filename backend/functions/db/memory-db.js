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

    async getMemories(email){
        try{
            const collection = this.getCollectionRef();
            const query = collection.where("creator", "==", email);
            const results = await query.get();
            const memories = results.docs.map(doc => this.docDataToModel(doc));
            return memories;
        }
        catch(e){
            throw e;
        }
    }
}

let memoryDb = new MemoryDb('memory');

module.exports = {memoryDb};