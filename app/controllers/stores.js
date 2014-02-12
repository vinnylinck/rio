/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    mBuilder = require('../../utils/messageBuilder'),
    _ = require('lodash');


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

/**
 *
 */
exports.update = function (req, res) {
    var store = req.loadedStore;

    store = _.extend(store, req.body);

    store.save(function(err) {
        res.json( mBuilder.buildQuickResponse(err, 'Unexpected error updating store.', store) );
    });
    
};