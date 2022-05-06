const functions = require("firebase-functions");
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { router: mainRouter} = require('./routers/main-router');

app.use(bodyParser.json());
app.use('/api',mainRouter);

exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
