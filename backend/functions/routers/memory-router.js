const express = require('express');
const { memoryDb } = require('../db/memory-db');
const { Memory } = require('../models/memory');
const { checkAuth } = require('../middleware/checkAuth');
const router = express.Router();

router.use(checkAuth);

router.post('/', async (req, res, next) => {
    const {memory} = req.body;
    memory.creator = req.user.email;
    try{
        const memoryDoc = await memoryDb.createMemory(memory);
        return res.json({
            message: 'Memory Created',
            memory: new Memory(memoryDoc)
        });
    }
    catch(e){
        res.err = e;
        next();
    }
});

module.exports = {router};