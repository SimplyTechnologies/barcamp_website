'use strict';

var url = require('url');
var path = require('path');

function __mongoConfig() {
    return process.env.MONGOLAB_URI !== 'undefined' && process.env.MONGOLAB_URI`;
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

    config.keys.general = process.env.KEY_GENERAL || config.keys.general;
    config.keys.auth = process.env.KEY_AUTH || config.keys.auth;

    return config;
}

module.exports = __createConfig();
