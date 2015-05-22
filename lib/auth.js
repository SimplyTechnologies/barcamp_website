'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var User = mongoose.model('User');
var crypto = require('./crypto');
var config = require('../config');

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

exports.requiresLogin = function (req, res, next) {
    if (!req.user) {
        return res.status(401).send({error: 'user is required'});
    }

    return User.findByIdQ(req.user)
        .then(function (user) {
            if (!user) {
                return res.status(401).send({error: 'user doesn\'t exist'});
            }

            req.user = user;

            next();
        })
        .catch(next);
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).send({error: 'user is required'});
        }

        if (!exports.hasRole(req.user, role)) {
            return res.status(403).end();
        }

        return next();
    };
};

exports.hasRole = function (user, role) {
    return !!(user && user.roles && ~user.roles.indexOf(role));
};

exports.isAdmin = function (user) {
    return exports.hasRole(user, 'admin');
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
