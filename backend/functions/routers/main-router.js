const express = require('express');
const { test } = require('../config');
const router = express.Router();

router.get('/test',(req, res, next) => {
    return res.json({
        message: test + ' worked'
    });
})

module.exports = {router};