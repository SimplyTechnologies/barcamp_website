var inherits = require('util').inherits;

function AuthenticationError(message) {
    this.message = message;
}

inherits(AuthenticationError, Error);

AuthenticationError.prototype.name = 'AuthenticationError';

exports.AuthenticationError = AuthenticationError;

