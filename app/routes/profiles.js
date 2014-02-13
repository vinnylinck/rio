/* jslint node:true */
'use strict';

module.exports = function profileRoutes(app) {
    var profiles = require('../controllers/profiles'),
        authorization = require('./middlewares/authorization.js');
    
    // requires OWNERSHIP privileges
    app.get('/profiles/:profileId', authorization.requiresAuth, authorization.requiresProfile, profiles.getProfile);    //*** Return profile
    
    // profile operations - REQUIRES ADMIN PRIVILEGES
    app.get('/admin/profiles', authorization.requiresAuth, authorization.isAdmin, profiles.all);                        //*** Retrieve all profiles
    app.get('/admin/profiles/:lazyProfId', authorization.requiresAuth, authorization.isAdmin, profiles.getProfile);     //*** Return profile in "lazy mode"
    app.put('/admin/profiles/:lazyProfId', authorization.requiresAuth, authorization.isAdmin, profiles.update);         //*** Add store to profile 
    
    // preparing params
    app.param('profileId', profiles.load);
    app.param('lazyProfId', profiles.lazyLoad);
};