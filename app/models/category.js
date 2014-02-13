/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 *vStore Schema
 */
var CategorySchema = new Schema({
    extId: {
        type: String,
        unique: true
    },
    name: String,
    status: String,
    level: String,
    parent_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    }
});

/**
 * Statics
 */
CategorySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

CategorySchema.statics.loadByStatus = function(id, st, cb) {
    this.findOne({ 
        _id: id,
        status: st
    }).exec(cb);
};

mongoose.model('Category', CategorySchema);