'use strict';

var url = require('url');
var path = require('path');

function __mongoConfig() {
    return process.env.MONGOLAB_URI !== 'undefined' && process.env.MONGOLAB_URI;
}

function __mailerConfig() {
    var username = process.env.SENDGRID_USERNAME;
    var password =  process.env.SENDGRID_PASSWORD;

    if (username && password) {
        return {
            username: username,
            password: password
        }
    }

    return null;
}

function __mergeSharedConfigs(shared, config) {
    for (var key in shared) {
        config[key] = config[key] || shared[key];
    }

    return config
}

function __createConfig() {
    var env = process.env.NODE_ENV || 'local';

    var config = require('./config');

    config = __mergeSharedConfigs(config.shared, config[env]);

    config.env = env;

    config.db = __mongoConfig() || config.db;

    config.email = __mailerConfig() || config.email;

    config.keys.general = process.env.KEY_GENERAL || config.keys.general;
    config.keys.auth = process.env.KEY_AUTH || config.keys.auth;

    return config;
}

module.exports = __createConfig();
