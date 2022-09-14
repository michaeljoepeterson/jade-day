const admin = require('firebase-admin');

/**
 * middleware to verify auth token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkToken = async (req, res , next) => {
    try{
        let {authorization} = req.headers;
        let token = authorization?.split(' ')[1]; 
        if(!token){
            res.status(422);
            return res.json({
                message:'Unauthorized'
            });
        }
        
        const decodedToken = await admin.auth().verifyIdToken(token);
        let {email} = decodedToken;
        req.userEmail = email;
        next();
    }
    catch(e){
        res.status(422);
        return res.json({
            message:'Unauthorized'
        });
    }
};

module.exports = {checkToken};