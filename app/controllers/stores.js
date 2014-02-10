/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    mBuilder = require('../../utils/messageBuilder');


/**
 *
 */
exports.load = function (req, res, next, id) {
    Store.findOne({ _id: id })
    .exec(function (err, store) {

        if (err || !store) {
            return res.json(  mBuilder.buildPreConditionFailure(id) );
        }
        req.loadedStore = store;
        next();

    });    
};

/**
 *
 */
exports.getStore = function (req, res) {
    return res.json(req.loadedStore);
};