'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bluebird = require('bluebird');

var bcrypt = bluebird.promisifyAll(require('bcrypt'));

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },

    roles: [String],

    hashedPassword: String,

    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

UserSchema.statics.sensetiveFields = [
    'hashedPassword',
    '__v'
];

UserSchema.pre('save', function (next) {
    this.updated = new Date();

    next();
});

UserSchema.methods.setPassword = function (password) {
    return this.encryptPassword(password).bind(this)
        .then(function (hash) {
            this.hashedPassword = hash;
            this._password = password;
        });
};

UserSchema.methods.getPassword = function () {
    return this._password;
};

UserSchema.methods.authenticate = function (plainText) {
    return new bluebird.Promise(function (resolve, reject) {
        resolve(!!this.hashedPassword);
    }.bind(this))
        .then(function () {
            return bcrypt.compareAsync(plainText, this.hashedPassword);
        }.bind(this));
};


UserSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashAsync(password, 10);
};

var transform = function (doc, ret) {
    ret = ret || {};

    for (var i = 0; i < UserSchema.statics.sensetiveFields.length; i++) {
        var field = UserSchema.statics.sensetiveFields[i];
        if (ret[field] !== 'undefined') {
            delete ret[field];
        }
    }

    return ret;
};

UserSchema.set('toJSON', {transform: transform});
UserSchema.set('toObject', {transform: transform});

mongoose.model('User', UserSchema);
