'use strict';

var AccountsHandler = require('../handlers/accounts');
var accounts = new AccountsHandler(require('../services/accounts'));

module.exports = function (app) {
    app.post('/accounts/signin', accounts.signIn.bind(accounts));
};
