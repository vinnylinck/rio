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
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    
});

mongoose.model('Category', CategorySchema);