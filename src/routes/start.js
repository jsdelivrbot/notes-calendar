'use strict';

var StartService = require('./../services/start');
var startService = new StartService();

module.exports = function(app) {
    app.route('/1')
        .get(getOne);
};

function getOne(req, res) {
    startService
        .getOne()
        .then(res.onFulfilled)
        .catch(res.onRejected);
}