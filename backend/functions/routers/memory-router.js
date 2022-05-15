const express = require('express');
const { memoryDb } = require('../db/memory-db');
const { Memory } = require('../models/memory');
const { checkAuth } = require('../middleware/checkAuth');
const { checkRole } = require('../middleware/checkRole');
const router = express.Router();

router.use(checkAuth);

router.post('/', checkRole(0), async (req, res, next) => {
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

router.put('/:id', checkRole(0), async (req, res, next) => {
    const {memory} = req.body;
    const {id} = req.params;
    try{
        const memoryDoc = await memoryDb.updateDocById(memory, id);
        return res.json({
            message: 'Memory Updated',
            memory: new Memory(memoryDoc)
        });
    }
    catch(e){
        res.err = e;
        next();
    }
});

router.get('/:email', async (req, res, next) => {
    try{
        const {email} = req.params;
        const memories = await memoryDb.getMemories(email);
        return res.json({
            message: 'Memories found',
            memories
        });
    }
    catch(e){
        res.err = e;
        next();
    }
});

module.exports = {router};