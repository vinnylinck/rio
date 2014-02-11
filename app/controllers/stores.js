/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    mBuilder = require('../../utils/messageBuilder');


/**
 *
 */
exports.load = function (req, res, next, id) {
    Store.load(id, function (err, store) {

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
exports.lazyLoad = function (req, res, next, id) {
    Store.lazyLoad(id, function (err, store) {

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