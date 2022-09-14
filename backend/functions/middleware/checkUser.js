const { userDb } = require("../db/user-db");

/**
 * middleware to find the user based off the user email
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkUser = async (req, res, next) => {
    try{
        let {userEmail} = req;
        if(!userEmail){
            res.status(422);
            return res.json({
                message:'Unauthorized'
            });
        }

        let user = await userDb.findUser(userEmail);
        req.user = user;
        next();
    }
    catch(e){
        res.status(422);
        return res.json({
            message:'Unauthorized'
        });
    }
}

module.exports = {checkUser};