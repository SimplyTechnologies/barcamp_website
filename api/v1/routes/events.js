'use strict';

var EventsHandler = require('../handlers/events');
var events = new EventsHandler(require('../services/events'));

var auth = require('../../../lib/auth');

module.exports = function (app) {
    app
        .get('/events', events.getEvents.bind(events))
        .get('/events/all', auth.requiresLogin, auth.requiresRole('admin'), events.getAllEvents.bind(events))
        .post('/events', auth.requiresLogin, auth.requiresRole('admin'), events.create.bind(events))
        .get('/events/current', events.getCurrentEvents.bind(events))
        .put('/events/:event', auth.requiresLogin, auth.requiresRole('admin'), events.update.bind(events))
        .delete('/events/:event', auth.requiresLogin, auth.requiresRole('admin'), events.delete.bind(events));

    app.param('event', events.param.bind(events));

};
