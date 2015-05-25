'use strict';

var ErrorHandler = require('../handlers/error');
var error = new ErrorHandler();

module.exports = function (app) {
    app.use(error.logErrors);
    app.use(error.errorHandler);

    app.all('*', function (req, res, next) {
        return res.status(404).send({error: 'endpoint is not found'});
    });
};
