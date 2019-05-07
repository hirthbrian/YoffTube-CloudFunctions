const functions = require('firebase-functions');
const getDownloadUrls = require('./getDownloadUrls');
const search = require('./search');
const channel = require('./channel');

exports.getDownloadUrls = functions.https.onRequest((req, res) => getDownloadUrls.handler(req, res));
exports.search = functions.https.onRequest((req, res) => search.handler(req, res));
exports.channel = functions.https.onRequest((req, res) => channel.handler(req, res));