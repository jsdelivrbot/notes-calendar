'use strict';

var express = require('express');
var app = express();
var config = require('./src/config/express.json');
var bodyParser = require('body-parser');
// "postinstall": "npm install express",
// heroku logs --app notes-calendar
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + config.rootDirectory));
// require('./src/middlewares/custom-render')(app);
// require('./src/routes/index')(app);

app.get('/', function(request, response) {
  response.render('index.html');
});

//Error 404
app.use(function(req, res) {
    res.onRejected({
        code: 404,
        message: 'Not found!'
    });
});

app.listen(config.port, function() {
    console.log('Server start on port: ' + (process.env.PORT || config.port));
});
