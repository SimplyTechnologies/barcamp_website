var config = require('../config');
require('../init')(config);

var mongoose = require('mongoose');
var User = mongoose.model('User');

var bluebird = require('bluebird');
bluebird.promisifyAll(User);
bluebird.promisifyAll(User.prototype);

function createAdmin(username, password) {
    var user = new User({
        username: username,
        roles: ['admin']
    });

    return user.setPassword(password)
        .then(function () {
            return user.saveAsync();
        });
}

var username = process.argv[2];
var password = process.argv[3];

if (!username) {
    throw new Error('Username and password are required');
}

if (!password) {

}

createAdmin(username, password)
    .spread(function (user) {
        console.log('%s was successfully created', user._id);
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(-1);
    });
