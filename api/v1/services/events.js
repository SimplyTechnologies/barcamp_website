'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var Event = mongoose.model('Event');

var _ = require('lodash');


exports.sanitize = function (event) {
    return _.pick(event, Event.editableFields);
};

exports.getAllGrouped = function (forAdmin, query) {
    var eventData = {
        topic: '$topic',
        name: '$name',
        start: '$start',
        end: '$end'
    };

    if (forAdmin) {
        eventData._id = '$_id';
    }

    var aggregateOptions = [{
        $sort: {
            start: 1
        }
    }, {
        $group: {
            _id: '$location',
            events: {
                $push: eventData
            }
        }
    }, {
        $project: {
            _id: 0,
            location: '$_id',
            events: 1
        }
    }];

    if (forAdmin) {
        query = query || {};
        query.disabled = false;
    }

    if (query) {
        aggregateOptions.unshift({
            $match: query
        });
    }

    return Event.aggregateQ(aggregateOptions);
};

exports.create = function (data) {
    var event = new Event(data);

    return event.saveQ();
};

exports.update = function (event, updateData) {
    _.merge(event, updateData);

    return event.saveQ();
};

exports.delete = function (event) {
    return Event.remove({_id: event._id }).execQ();
};

exports.getById = function (id) {
    return Event.findByIdQ(id);
};

exports.getCurrentEvents = function () {
    return exports.getAllGrouped(false, { end: {$gte: new Date() }})
        .then(function (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].events) {
                    events[i].events = events[i].events.slice(0, 3);
                }
            }

            return events;
        });
};
