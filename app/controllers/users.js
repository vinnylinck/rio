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
    user.save( function saveUser(err) {
        
        result = mBuilder.buildQuickResponse(err);
        return res.json(result);
    });
};