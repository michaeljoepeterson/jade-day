const { fb } = require('../config');

/**
 * base class for extending to create specific db interfaces
 * must set collection name in child class
 */
class BaseDb{
    constructor(){
        this.db = fb.firestore();
        this.collectionName = null;
    }

    /**
     * save the provided document
     * @param {any} doc 
     * @param {boolean} useRawDoc
     * @returns the raw doc or the doc data depending on use raw doc bool
     */
    async saveDoc(doc){
        try{
            let data = {...doc};
            let newDoc = await this.db.collection(this.collectionName).add(data);
            let docData = await newDoc.get();
            return this.docDataToModel(docData);
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    /**
     * update a single doc by id
     * @param {*} doc 
     * @param {*} id 
     * @returns 
     */
    async updateDocById(doc, id){
        try{
            let data = {...doc};
            let newDoc = await this.db.collection(this.collectionName).doc(id).update(data);
            let docData = await newDoc.get();
            return this.docDataToModel(docData);
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    /**
     * return the collection ref for querying
     * @returns
     */
    getCollectionRef(){
        try{
            return this.db.collection(this.collectionName);
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    /**
     * convert doc data to standard raw model data
     * @param {*} docData 
     * @returns 
     */
    docDataToModel(docData){
        return {
            ...docData.data(), 
            id: docData.id
        };
    }
}

module.exports = {BaseDb};