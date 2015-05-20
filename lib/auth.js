'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('./crypto');
var config = require('../config');
var bluebird = require('bluebird');

function signin(res, id, deviceId, deviceType) {
    res.set('X-Auth-Token', getToken(id, deviceId, deviceType));
}

function getToken(id, deviceId, deviceType) {
    return crypto.encrypt('auth', {user: id.toString() });
}

function isAuthenticated(req) {
    return !!req.user;
}

exports.parseAuthToken = function parseAuthToken(req, res, next) {
    var token = req.get('X-Auth-Token');

    if (token) {
        crypto.decrypt('auth', token, function (err, tokenData) {
            if (err) {
                return res.status(400).send({error: 'invalid token cipher'});
            }

            req.user = tokenData.user;

            next();
        });
    } else {
        next();
    }
};

/**
 * Middleware for checking the existence of authorized user
 * @param {Object} req express response object
 * @param {Object} res express response object
 * @param {Function} next the callback function of middleware chain
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.user) {
        return res.status(401).send({error: 'user is required'});
    }

    return User.findById(req.user).execQ()
        .then(function (user) {
            if (!user) {
                return res.status(401).send({error: 'user doesn\'t exist'});
            }

            next();
        })
        .catch(next);
};

/**
 * Middleware for checking the existence of required role
 * @param {String} role
 */
exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).send({error: 'user is required'});
        }

        var hasRole = req.user.roles.indexOf(role) !== -1;
        if (!hasRole) {
            return res.status(403).end();
        }

        return next();
    };
};

exports.init = function (req, res, next) {
    req.signin = function (userId, deviceId, deviceType) {
        signin(res, userId, deviceId, deviceType);
    };
    req.isAuthenticated = function () {
        return isAuthenticated(req);
    };
    next();
};

exports.getToken = getToken;
