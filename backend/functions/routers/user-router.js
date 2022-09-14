const express = require('express');
const { userDb } = require('../db/user-db');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

router.post('/check', checkToken, async (req, res, next) => {
    let {user} = req.body;
    try{
        let appUser = await userDb.checkUser(user);
        return res.json({
            message: 'Found User',
            user: appUser
        });
    }
    catch(e){
        res.err = e;
        next();
    }
})

module.exports = {router};