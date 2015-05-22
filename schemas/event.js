'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    topic: {
        en: String,
        hy: String
    },

    name: {
        en: String,
        hy: String
    },

    image: String,

    location: { type: String, required: true },
    start: { type: Date, index: true, required: true },
    end: { type: Date, index: true, required: true },

    disabled: { type: Boolean, default: false },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

EventSchema.statics.sensetiveFields = [
    '__v'
];

EventSchema.statics.editableFields = [
    'topic',
    'name',
    'image',
    'location',
    'start',
    'end',
    'disabled'
];

EventSchema.pre('save', function (next) {
    this.updated = new Date();

    next();
});

var transform = function (doc, ret) {
    ret = ret || {};

    for (var i = 0; i < EventSchema.statics.sensetiveFields.length; i++) {
        var field = EventSchema.statics.sensetiveFields[i];
        if (ret[field] !== 'undefined') {
            delete ret[field];
        }
    }

    return ret;
};

EventSchema.set('toJSON', {transform: transform});
EventSchema.set('toObject', {transform: transform});

mongoose.model('Event', EventSchema);
