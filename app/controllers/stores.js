/* jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    mBuilder = require('../../utils/messageBuilder');

exports.getStore = function getStore(req, res) {
    
    Store.findOne( { _id: req.params.id }, function(err, store) {
        return res.json( mBuilder.buildQuickResponse(err, null, store) );
    });
};