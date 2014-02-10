/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app, passport) {
    var users = require('../controllers/users'),
        authorization = require('./middlewares/authorization.js');

    // main user routes
    app.post('/users', authorization.requiresAuth, authorization.isAdmin, users.create);               // *** create user
    app.get('/users/me', users.me);                                                                    // *** returns current user info
    
    
    
    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local'), users.signIn);                           // *** sign in
    app.delete('/users/session', users.signOut);                                                        // *** sign out
    
    // User Session Management
    app.put('/users/session/store/:storeId', 
            authorization.requiresAuth, 
            authorization.requiresStore, 
            users.setWorkingStore);                                                                     // *** updateWorkingStore
    
    
    // user operations - REQUIRES ADMIN PROFILE or OWNERSHIP
    app.get('/users/:userId', authorization.requiresAuth, authorization.isMe, users.getUser);           // *** get user info
    app.put('/users/:userId', authorization.requiresAuth, authorization.isAdmin, users.update);         // *** set profile onto user
    
    
    // Finish with setting up the articleId param
    app.param('userId', users.load);
};