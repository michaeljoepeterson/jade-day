const admin = require('firebase-admin');
const { userDb } = require('../db/user-db');


const checkAuth = async (req, res, next) => {
    try{
        let {authorization} = req.headers;
        let token = authorization?.split(' ')[1];
        if(token){
            const decodedToken = await admin.auth().verifyIdToken(token);
            let {email,name} = decodedToken;
            console.log(email,name);
            let user = await userDb.findUser(email);
            req.user = user;
            next();
        }
        else{
            res.status(422);
            return res.json({
                message:'Unauthorized'
            });
        }
    }
    catch(e){
        res.status(422);
        return res.json({
            message:'Unauthorized'
        });
    }
}

module.exports = {checkAuth};