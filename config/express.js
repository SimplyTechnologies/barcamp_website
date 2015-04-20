var express = require('../node_modules/sails/node_modules/express');

module.exports.express = {
	customMiddleware: function(app) {
		app.use(express.static(process.cwd() + '/public'));
	}
};



