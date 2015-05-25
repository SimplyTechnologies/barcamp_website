'use strict';

var config = require('../../../config');
var Q = require('q');
var sendgrid  = require('sendgrid')(config.email.username, config.email.password);


exports.ask = function (text, name, email) {
    var defer = Q.defer();

    var mailOptions = {
        from: email,
        fromname: name,
        to: 'barista@barcamp.am',
        subject: 'FAQ',
        text: text
    };

    sendgrid.send(mailOptions, function(err, json) {
        if (err) {
            defer.reject(err);
        }
        defer.resolve(json);
    });

    return defer.promise;
};

