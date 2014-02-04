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
    
    // Connect 3.0 replacement for: app.use(require('connect').bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());
    
    // the last thing I need to do...
    app.use(app.router);
};