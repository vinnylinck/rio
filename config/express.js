/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    config = require('./index');


module.exports = function(app, passport, db) {
    app.set('showStackError', true);
    
    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
    }
    
    // Enable jsonp
    app.enable("jsonp callback");
    
    // Configuring Express App
    app.configure(function () {
        
        // The cookieParser should be above session
        app.use(express.cookieParser());
        
        // Request body parsing middleware should be above methodOverride
        // Connect 3.0 replacement for: 
        //app.use(express.bodyParser());
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        
        // Express-Mongo session storage
        app.use(express.session({
            secret: config.sessionSecret,
            store: new mongoStore({
                db: db.connection.db,
                collection: config.sessionCollection
            })
        }));
        
        // Use passport session
        app.use(passport.initialize());
        app.use(passport.session());
        
        // Connect flash for flash messages
        app.use(flash());
    });
    
    
    
    // the last thing I need to do...
    app.use(app.router);
    
    // Setting the fav icon and static folder
    app.use(express.favicon());
};