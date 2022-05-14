const express = require('express');
const { test } = require('../config');
const router = express.Router();
const { router: userRouter } = require('./user-router');

router.get('/test',(req, res, next) => {
    return res.json({
        message: test + ' worked'
    });
})
router.use('/users', userRouter);

module.exports = {router};