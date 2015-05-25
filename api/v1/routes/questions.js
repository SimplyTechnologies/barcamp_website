'use strict';

var QuestionsHandler = require('../handlers/questions');
var questions = new QuestionsHandler(require('../services/questions'));

module.exports = function (app) {
    app.post('/questions', questions.ask.bind(questions));
};
