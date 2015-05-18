'use strict';

var _ = require('lodash');
var auth = require('../../../lib/auth');

function EventsHandler(events) {
    this.service = events;
}

EventsHandler.prototype.getEvents = function(req, res, next) {
    return this.service.getAllGrouped()
        .then(function (events) {
            return res.status(200).send(events);
        })
        .catch(next);
};

EventsHandler.prototype.getAllEvents = function(req, res, next) {
    return this.service.getAllGrouped(true)
        .then(function (events) {
            return res.status(200).send(events);
        })
        .catch(next);
};

EventsHandler.prototype.create = function(req, res, next) {
    req.checkBody('location', 'required').notEmpty();
    req.checkBody('start', 'required, date').notEmpty().isDate();
    req.checkBody('end', 'required, date').notEmpty().isDate();


    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    return this.service.create(this.service.sanitize(req.body))
        .then(function (event) {
            res.status(201).send(event);
        })
        .catch(next);
};

EventsHandler.prototype.update = function(req, res, next) {
    req.checkBody('location', 'required').optional().notEmpty();
    req.checkBody('start', 'required, date').optional().notEmpty().isDate();
    req.checkBody('end', 'required, date').optional().notEmpty().isDate();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    return this.service.update(req.event, this.service.sanitize(req.body))
        .then(function (event) {
            res.status(201).send(event);
        })
        .catch(next);
};

// TODO: do not query event, just delete it
EventsHandler.prototype.delete = function(req, res, next) {
    return this.service.delete(req.event._id)
        .then(function () {
            res.status(200).end();
        })
        .catch(next);
};

EventsHandler.prototype.param = function(req, res, next, eventId) {
    return this.service.getById(eventId)
        .then(function (event) {
            if (!event) {
                return res.status(404).end();
            }

            req.event = event;
            next();
        })
        .catch(next);
};

EventsHandler.prototype.getCurrentEvents = function(req, res, next) {
    return this.service.getCurrentEvents()
        .then(function (events) {
            res.status(200).send(events);
        })
        .catch(next);
};

module.exports = EventsHandler;
