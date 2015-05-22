'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var bcrypt = require('bcrypt');
var bcryptCompare = Q.denodeify(bcrypt.compare);
var bcryptHash = Q.denodeify(bcrypt.hash);


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
    return this.encryptPassword(password)
        .then(function (hash) {
            this.hashedPassword = hash;
            this._password = password;
        }.bind(this));
};

UserSchema.methods.getPassword = function () {
    return this._password;
};

UserSchema.methods.authenticate = function (plainText) {
    if (!this.hashedPassword) {
        return Q(false);
    }

    return bcryptCompare(plainText, this.hashedPassword);
};


UserSchema.methods.encryptPassword = function (password) {
    return bcryptHash(password, 10);
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
