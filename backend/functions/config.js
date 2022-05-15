exports.test = process.env.TEST;
exports.DOMAINS = process.env.DOMAINS;
const admin = require('firebase-admin');

let serviceAccount = {
    "type": process.env.TYPE ? process.env.TYPE : 'test',
    "project_id": process.env.PROJECT_ID ? process.env.PROJECT_ID : 'test',
    "private_key_id": process.env.PRIVATE_KEY_ID ? process.env.PRIVATE_KEY_ID : 'test',
    "private_key": process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : 'test',
    "client_email": process.env.CLIET_EMAIL ? process.env.CLIET_EMAIL : 'test',
    "client_id": process.env.CLIENT_ID ? process.env.CLIENT_ID : 'test',
    "auth_uri": process.env.AUTH_URI ? process.env.AUTH_URI : 'test',
    "token_uri": process.env.TOKEN_URI ? process.env.TOKEN_URI : 'test',
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL ? process.env.AUTH_PROVIDER_X509_CERT_URL : 'test',
    "client_x509_cert_url": process.env.CLIENT_X509_CERT ? process.env.CLIENT_X509_CERT : 'test'
};

exports.fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL,
    storageBucket: process.env.BUCKET
});
