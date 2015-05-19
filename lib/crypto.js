'use strict';

var crypto = require('crypto');
var keys = require('../config').keys;
var bcrypt = require('bcrypt');

exports.encryptText = function (plainText, key) {
    key = key || keys.general;
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var cipherText = cipher.update(plainText, 'utf8', 'hex');
    cipherText += cipher.final('hex');

    return cipherText;
};

exports.decryptText = function (cipherText, key) {
    key = key || keys.general;

    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var plainText = decipher.update(cipherText, 'hex', 'utf8');
    plainText += decipher.final('utf8');

    return plainText;
};


exports.encrypt = function (type, payload, expire) {
    var key = keys[type] || keys.general;

    payload = payload || {};
    payload.created = Date.now();

    if (expire) {
        payload.expire = expire;
    }

    return exports.encryptText(JSON.stringify(payload), key);
};

var handleResult = function (callback, err, result) {
    if (callback) {
        process.nextTick(function () {
            callback(err, result);
        });
    } else {
        if (err) {
            throw err;
        } else {
            return result;
        }
    }
};

exports.decrypt = function (type, cipherText, callback) {
    var key = keys[type] || keys.general;

    var payload;

    try {
        payload = JSON.parse(exports.decryptText(cipherText, key));
    } catch (e) {
        return handleResult(callback, e);
    }

    if (payload.expire) {
        var expired = (Date.now() - payload.created) > payload.expire;

        if (expired) {
            return handleResult(callback, { name: 'TokenExpiredError'} );
        }
    }

    return handleResult(callback, null, payload);
};

exports.generateSalt = function (len) {
    if (typeof len !== 'number' || len <= 0 || len !== parseInt(len, 10)) {
        throw new Error('Invalid salt length');
    }
    if (crypto.randomBytes) {
        return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
    } else {
        for (var i = 0, salt = ''; i < len; i++) {
            salt += saltChars.charAt(Math.floor(Math.random() * saltCharsCount));
        }
        return salt;
    }
};

exports.getHashedPassword = function (salt, password) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
};
