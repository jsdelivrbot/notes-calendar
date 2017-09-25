'use strict';

var express = require('express');
var app = express();
//var config = require('./src/config/express.json');
var bodyParser = require('body-parser');
// "postinstall": "npm install express",
// heroku logs --app notes-calendar
// for parsing application/json
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
//require('./src/middlewares/custom-render')(app);
//require('./src/routes/index')(app);

app.get('/', function(request, response) {
  response.render('index');
});

// Error 404
app.use(function(req, res) {
    res.onRejected({
        code: 404,
        message: 'Not found!'
    });
});

app.listen(app.get('port'), function() {
    console.log('Server start on port: ' + app.get('port'));
});
/*var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/
