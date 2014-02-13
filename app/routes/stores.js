/* jslint node:true */
'use strict';

module.exports = function storesRoutes(app) {
    var stores = require('../controllers/stores'),
        authorization = require('./middlewares/authorization.js');
    
    // store info - REQUIRES ADMIN PRIVILEGES
    app.get('/admin/stores/:storeId', authorization.requiresAuth, authorization.requiresStore, stores.getStore);          // retrieves store information
    app.put('/admin/stores/:storeId', authorization.requiresAuth, authorization.isAdmin, stores.update);                  // updates store information
    
    // setting params
    app.param('storeId', stores.load);
    app.param('lazyStoreId', stores.lazyLoad);
    
};