'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var bluebird = require('bluebird');
bluebird.promisifyAll(User);

var AuthenticationError = require('../errors').AuthenticationError;

exports.signIn = function (username, password) {
    var user;
    return User.findOneAsync({username: username})
        .then(function (u) {
            if (!u) {
                throw new AuthenticationError('user with such such username and password doesn\'t exist');
            }

            user = u;

            return u.authenticate(password);
        })
        .then(function (authenticated) {
            if (!authenticated) {
                throw new AuthenticationError('user with such such username and password doesn\'t exist');
            }

            return user;
        });
};

