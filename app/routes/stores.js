/* jslint node:true */
'use strict';

module.exports = function storesRoutes(app) {
    var stores = require('../controllers/stores'),
        authorization = require('./middlewares/authorization.js');
    
    // store info - REQUIRES ADMIN PRIVILEGES
    app.get('/stores/:storeId', authorization.requiresAuth, authorization.isAdmin,stores.getStore);
    
    // setting params
    app.param('storeId', stores.load);
    
};