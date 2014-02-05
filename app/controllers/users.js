/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    mBuilder = require('../../utils/messageBuilder');

exports.me = function usersMe(req, res) {
    res.json(req.user || {});
};

exports.create = function usersCreate(req, res) {
    var user = new User(req.body),
        result;
    
    user.provider = 'local';
    user.save( function saveUser(err, inserted) {
        result = mBuilder.buildQuickResponse(err);
        return res.json(result);
    });
};

exports.handleSession = function usersSession(req, res, next) {
    var err, msg;
    
    if (!req.user) {
        err = 'internal error when establishing connection with server.';
        msg = 'An unexpected error happend when opening conenction with server using your account. Please contact support for more details.';
    }
    
    res.json(mBuilder.buildQuickResponse(err, msg, req.user.getMetadata()));
};