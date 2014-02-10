/* jslint node: true */
'use strict';

var mBuilder = require('../../../utils/messageBuilder');

/**
 * Generic authentication check routing middleware
 */
exports.requiresAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};

/**
 * Check if user is a full system admin
 */
exports.isAdmin = function(req, res, next) {
    if (!req.user.admin) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};

/**
 * Check if user is the logged one
 */
exports.isMe = function(req, res, next) {
    if ( !(req.user.admin || req.user._id == req.params.userId) ) {
        return res.json( mBuilder.buildNotAuthorized() );
    }
    next();
};