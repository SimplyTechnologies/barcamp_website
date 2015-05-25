var config = require('../config');
require('../init')(config);

var mongoose = require('mongoose-q')(require('mongoose'));
var User = mongoose.model('User');

function createAdmin(username, password) {
    var user = new User({
        username: username,
        roles: ['admin']
    });

    return user.setPassword(password)
        .then(function () {
            return user.saveQ();
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
