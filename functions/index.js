const functions = require('firebase-functions');
const getDownloadUrls = require('./getDownloadUrls');
const search = require('./search');

exports.getDownloadUrls = functions.https.onRequest((req, res) => getDownloadUrls.handler(req, res));
exports.search = functions.https.onRequest((req, res) => search.handler(req, res));