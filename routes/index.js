var fs = require('fs');
var path = require('path');
var Router = require('express').Router;

function initRoutes() {
    'use strict';

    var router = new Router();

    var routes = fs.readdirSync(__dirname);

    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (route !== 'index.js') {
            router.use(require(path.join(__dirname, route))(Router));
        }
    }

    return router;
}

module.exports = initRoutes();
