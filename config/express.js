/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var express = require('express');

module.exports = function(app) {
    app.set('showStackError', true);

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }
};