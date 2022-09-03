const express = require('express');
const { memoryDb } = require('../db/memory-db');
const { Memory } = require('../models/memory');
const { checkAuth } = require('../middleware/checkAuth');
const { checkRole } = require('../middleware/checkRole');
const { imageStorage } = require('../storage/storage');
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

router.post('/image/:id', async (req, res, next) => {
    
    try{
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err);
            }
            next();
        })
        const {id} = req.params;
        const {image, name} = req.body;
        console.log(id);
        console.log(name);
        console.log(req.files);
        imageStorage.saveImage(req.file, 'test', id);
        return res.json({
            message: 'Uploaded image'
        })
    }
    catch(e){
        res.err = e;
        next();
    }
});

module.exports = {router};