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
    children: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    }]
});

/**
 * Statics
 */
CategorySchema.statics.load = function(id, cb) {
    this.findOne({ 
        _id: id,
        status: 'A'
    }).populate('children')
    .exec(cb);
};

CategorySchema.statics.lazyLoad = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Category', CategorySchema);