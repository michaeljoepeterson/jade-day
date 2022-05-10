exports.test = process.env.TEST;
exports.DOMAINS = process.env.DOMAINS;
const admin = require('firebase-admin');

let serviceAccount = {
    "type": process.env.type ? process.env.type : 'test',
    "project_id": process.env.project_id ? process.env.project_id : 'test',
    "private_key_id": process.env.private_key_id ? process.env.private_key_id : 'test',
    "private_key": process.env.private_key ? process.env.private_key.replace(/\\n/g, '\n') : 'test',
    "client_email": process.env.client_email ? process.env.client_email : 'test',
    "client_id": process.env.client_id ? process.env.client_id : 'test',
    "auth_uri": process.env.auth_uri ? process.env.auth_uri : 'test',
    "token_uri": process.env.token_uri ? process.env.token_uri : 'test',
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url ? process.env.auth_provider_x509_cert_url : 'test',
    "client_x509_cert_url": process.env.client_x509_cert_url ? process.env.client_x509_cert_url : 'test'
};

exports.fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.db_url
});
