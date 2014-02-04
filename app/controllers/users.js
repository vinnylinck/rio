/* jslint node: true */
'use strict';

exports.me = function usersMe(req, res) {
    res.json(req.user || {});
};

exports.create = function usersCreate(req, res) {
    console.log(req.body);
    res.redirect('/users/me');
};