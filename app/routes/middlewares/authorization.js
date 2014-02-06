/* jslint node: true */
'use strict';

var mBuilder = require('../../../utils/messageBuilder');

/**
 * Generic authentication check routing middleware
 */
exports.requiresAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json (mBuilder.buildQuickResponse(401, 'Not authorized'));
    }
    next();
};