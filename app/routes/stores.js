/* jslint node:true */
'use strict';

module.exports = function storesRoutes(app) {
    var stores = require('../controllers/stores'),
        authorization = require('./middlewares/authorization.js');
    
    // REQUIRES OWNERSHIP
    app.get('/stores/:storeId', authorization.requiresAuth, authorization.requiresStore, stores.getStore);          // retrieves store information
	
	// REQUIRES ADMIN PRIVILEGES
    app.put('/admin/stores/:storeId', authorization.requiresAuth, authorization.isAdmin, stores.update);            // updates store information
    
    // setting params
    app.param('storeId', stores.load);
    app.param('lazyStoreId', stores.lazyLoad);
    
};