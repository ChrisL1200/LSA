/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mailer = require('express-mailer');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Cruvita"
  }, function (username, password, callback) {
    callback(username === "cruvita" && password === "community1809");
  }
);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Calculate Cruvita Scores
// require('./components/loadData');
// Setup server
var app = express();
//Express auth piece
if(!config.noAuth) {
	console.log("AUTH ON");
	app.use(auth.connect(basic));
}
if(app.get('env') === 'development') {
	mongoose.set('debug', true);
}
// app.get('/', function(req,res) {
//   res.send("Hello from express - " + req.user + "!" );
// });
// app.use(auth.connect(basic));

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Configure express-mail and setup default mail data.
mailer.extend(app, {
  from: 'info@cruvita.com',
  host: 'smtp.cruvita.com', // hostname
  secureConnection: false, // use SSL
  port: 587, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'info@cruvita.com',
    pass: 'community1809'
  }
});

// Expose app
exports = module.exports = app;
