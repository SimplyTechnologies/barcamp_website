'use strict';
var AuthenticationError = require('../errors').AuthenticationError;

function AccountsHandler(accounts) {
    this.service = accounts;
}

AccountsHandler.prototype.signIn = function(req, res, next) {
    req.checkBody('username', 'required').notEmpty();
    req.checkBody('password', 'required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    return this.service.signIn(req.body.username, req.body.password)
        .then(function (user) {
            req.signin(user._id);
            res.status(200).send(user);
        })
        .catch(function (err) {
            if (err instanceof AuthenticationError) {
                res.status(400).send({error: err.message});
            } else {
                next(err);
            }
        });
};

module.exports = AccountsHandler;
