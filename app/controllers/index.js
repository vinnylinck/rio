/* jslint node: true */
'use strict';

var pkg = require('../../package.json');

exports.hit = function indexHit(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:58239");
    res.header("Access-Control-Allow-Credentials", true);
    //res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    
    console.log(req.sessionID, req.method, req.originalUrl);

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
    
    // cleaning session
    req.session.destroy();
    
    res.json(result);
};