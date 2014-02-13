/* jslint node:true */
'use strict';

module.exports = function usersRoutes(app, passport) {
    var users = require('../controllers/users'),
        authorization = require('./middlewares/authorization.js');

    // Setting the local strategy route
    app.get('/users/me', users.me);                                                                     // *** returns current user info
    app.post('/users/session', passport.authenticate('local'), users.signIn);                           // *** sign in
    app.delete('/users/session', users.signOut);                                                        // *** sign out
    
    // User Session Management
    app.put('/users/session/store/:lazyStoreId', 
            authorization.requiresAuth, 
            authorization.requiresStore, 
            users.setWorkingStore);                                                                     // *** updateWorkingStore
    
    // REQUIRES OWNERHSIP
    app.get('/users/:userId', authorization.requiresAuth, authorization.isMe, users.getUser);           // *** get user info
    
    // REQUIRES ADMIN PRIVILEGES
    app.post('/admin/users', authorization.requiresAuth, authorization.isAdmin, users.create);                // *** create user
    app.put('/admin/users/:userId', authorization.requiresAuth, authorization.isAdmin, users.update);         // *** set profile onto user
    
    
    // Finish with setting up the articleId param
    app.param('userId', users.load);
};