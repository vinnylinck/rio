/* jslint node: true */
'use strict ';

var fHelper = require('./formatHelper');

exports.buildQuickResponse = function buildQResp(err, msg, data) {
    var isFine = fHelper.isNullOrUndefined(err),
        result = { ok: isFine, result: data };
    
    if (!isFine) {
        result.error = {
            code: err.code,
            details: err.toString()
        };
        
        if (fHelper.checkStringLen(msg)) {
            result.error.message = msg;
        }
    }
    
    return result;
};

