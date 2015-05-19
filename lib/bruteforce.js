'use strict';

var ExpressBrute = require('express-brute');

var RedisStore = require('express-brute-redis');
var redis = require('../lib/redis');

var store;


exports.init = function (config) {
    if (config.env === 'production' || config.env === 'staging' || config.env === 'staging')  {
        store = new RedisStore({client: redis.getClient()});
    } else {
        store = new ExpressBrute.MemoryStore();
    }
};

exports.getMiddleware = function () {
    return new ExpressBrute(store, {
        freeRetries: 1000,
        proxyDepth: 1,
        attachResetToRequest: true,
        minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
        maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
        lifetime: 24*60*60 // 1 day (seconds not milliseconds)
    }).prevent;
};
