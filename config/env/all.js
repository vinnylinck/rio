/* jslint node: true */
'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 9000,
    
    // Cookie secret
    cookieSecret: 'R3TA1L-1N51GHT-0RCH3STRAT0R',

    // Cookie sid
    cookieKey: 'rio.cookie.sid',

    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'RETAIL-INSIGHT-ORCHESTRATOR',

    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions'
};