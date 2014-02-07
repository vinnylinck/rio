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
    
    // user operations - REQUIRES ADMIN PROFILE or OWNERSHIP
    app.get('/users/:id', authorization.requiresAuth, authorization.isMe, users.getUser);               // *** get user info
    app.put('/users/:id', authorization.requiresAuth, authorization.isAdmin, users.update);             // *** set profile onto user
    
    
    // Finish with setting up the articleId param
    app.param('id', users.load);
};