/* jslint node: true */
'use strict';

var pkg = require('../../package.json');

exports.hit = function indexHit(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    next();
};

exports.root = function indexRoot(req, res) {
    var 
        result = {
        ok: true,
        status: 200,
        name: "RIO_1",
        tagline: pkg.description,
        version : {
            number : pkg.version,
            build_hash: "0a5781f44876e8d1c30b6360628d59cb2a7a2bbb",
            build_timestamp: "2014-01-10T10:18:37Z",
        }
    };
    
    
    if (process.env.NODE_ENV === 'development') {
        result.dependencies = pkg.dependencies;
    }
    
    res.json(result);
};