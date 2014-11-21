/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
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
	app.use(auth.connect(basic));
}
// app.get('/', function(req,res) {
//   res.send("Hello from express - " + req.user + "!" );
// });

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;