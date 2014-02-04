/* jslint node: true */
'use strict ';

var fHelper = require('./formatHelper');

exports.buildQuickResponse = function buildQResp(err, msg) {
    var isFine = fHelper.isNullOrUndefined(err),
        result = { ok: isFine };
    
    if (!isFine) {
        result.error = {
            code: err.toString()
        };
        
        if (fHelper.checkStringLen(msg)) {
            result.error.message = msg;
        }
    }
    
    return result;
};

