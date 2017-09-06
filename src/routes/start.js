const StartService = require('./../services/start');
const startService = new StartService();

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