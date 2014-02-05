/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    fHelper = require('../../utils/formatHelper');

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        unique: true
    },
    hashed_password: String,
    provider: String,
    salt: String
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Validations
 */
// the below 4 validations only apply if you are signing up traditionally
// if you are authenticating by any of the oauth strategies, don't validate
UserSchema.path('name').validate(function(name) {
    var result = (this.provider? fHelper.checkStringLen(name) : true); 
    return result;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
    var result = (this.provider? fHelper.checkStringLen(email) : true); 
    return result;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function(username) {
    var result = (this.provider? fHelper.checkStringLen(username) : true); 
    return result;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    var result = (this.provider? fHelper.checkStringLen(hashed_password) : true); 
    return result;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
    
    if (!fHelper.validatePresenceOf(this.password) && !this.provider)
        next(new Error('Invalid password'));
    else
        next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },
    
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },
    
    /**
     * Returns a "friendly" metadata containing user info.
     *
     * @api public
     */
    getMetadata: function () {
        var metaInfo = {
            name: this.name,
            email: this.email,
            username: this.username
        };
        
        return metaInfo;
    }
};

mongoose.model('User', UserSchema);