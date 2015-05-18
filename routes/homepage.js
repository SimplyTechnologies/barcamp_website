'use strict';

module.exports = function (Router) {
    var router = new Router();

    router.get('/', function (req, res, next) {
        res.render('homepage');

    });

    return router;
};

