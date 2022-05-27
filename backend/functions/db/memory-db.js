const { BaseDb } = require("./base-db");

class MemoryDb extends BaseDb{
    constructor(collectionName){
        super();
        this.collectionName = collectionName;
    }

    async createMemory(memory){
        try{
            const foundMemory = await this.checkMemory(memory.creator, memory.date);
            if(foundMemory.length > 0){
                return foundMemory[0];
            }
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

    async checkMemory(email, date){
        const collection = this.getCollectionRef();
        const query = collection.where('creator', '==', email).where('date', '==', date);
        const results = await query.get();
        const memories = results.docs.map(doc => this.docDataToModel(doc));

        return memories;
    }

    async getMemories(email){
        try{
            const collection = this.getCollectionRef();
            const query = collection.where('creator', '==', email);
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