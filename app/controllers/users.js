/* jslint node: true */
'use strict';

exports.signin = function usersSignin(req, res, next) {
    res.json({ operation: 'signin' });
};

exports.signout = function usersSignOut(req, res, next) {
    res.json({ operation: 'signout' });
};