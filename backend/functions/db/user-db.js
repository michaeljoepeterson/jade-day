const { User } = require("../models/user");
const { BaseDb } = require("./base-db");

class UserDb extends BaseDb{

    constructor(collectionName){
        super();
        this.collectionName = collectionName;
    }

    /**
     * check if the user exists and return them or create a new one
     * @param {User} user 
     * @returns 
     */
    async checkUser(user){
        try{
            let {email} = user;
            let foundUser = await this.findUser(email);
            if(foundUser){
                return foundUser;
            }

            return this.createUser(user);
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    async findUser(email){
        try{
            let collection = this.getCollectionRef();
            let query = collection.where("email", "==", email);
            let results = await query.get();
            if(results.docs.length > 0){
                return results.docs[0].data();
            }

            return null;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }

    /**
     * create a new user
     * @param {*} user 
     * @returns 
     */
    async createUser(user){
        try{
            let doc = await this.saveDoc({...user});
            return doc;
        }
        catch(e){
            console.error(e);
            throw e;
        }
    }
}

const userDb = new UserDb('users');

module.exports = {userDb};