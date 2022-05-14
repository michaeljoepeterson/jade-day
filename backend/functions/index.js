const functions = require("firebase-functions");
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { router: mainRouter} = require('./routers/main-router');
const { cors } = require('./middleware/cors');

app.use(bodyParser.json());
app.use(cors);
app.use('/api',mainRouter);

app.use((req,res,next) => {
    res.status(500);
    let err = res.err ? res.err : 'no error provided';
    console.log('error: ',err);
    return res.json({
        message:'An error occured',
        error:err.message ? err.message : err
    })
});

exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
