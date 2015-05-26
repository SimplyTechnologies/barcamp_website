'use strict';

function QuestionsHandler(question) {
    this.service = question;
}

QuestionsHandler.prototype.ask = function(req, res, next) {
    req.checkBody('name', 'required').notEmpty();
    req.checkBody('text', 'required').notEmpty();
    req.checkBody('email', 'required').notEmpty();
    req.checkBody('email', 'valid email required').isEmail();


    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    return this.service.ask(req.body.text, req.body.name, req.body.email)
        .then(function (status) {
            res.status(200).send(status);
        })
        .catch(next);
};

module.exports = QuestionsHandler;
