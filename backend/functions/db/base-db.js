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
    async saveDoc(doc, useRawDoc){
        try{
            let data = {...doc};
            let newDoc = await this.db.collection(this.collectionName).add(data);

            if(useRawDoc){
                return newDoc;
            }
            let docData = await newDoc.get();
            return docData.data();
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
}

module.exports = {BaseDb};