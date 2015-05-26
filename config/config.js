'use strict';

module.exports = {
    shared: {
        apiVersion: '1'
    },

    local: {
        db: 'mongodb://localhost/barcamp',
        keys: {
            general: '306a4f8528e215d6c239ad1f5e4159d0',
            auth: 'ff0000ffe45b2541ee3a3d967fbf957d'
        },
        email: {
            username: 'app36745265@heroku.com',
            password: '0y94j5de8197'
        }
    },

    production: {
        db: ''
    }
};
