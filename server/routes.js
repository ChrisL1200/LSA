/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/images', require('./api/images'));
  app.use('/api/schools', require('./api/school'));
  app.use('/api/homes', require('./api/homes'));
  app.use('/api/tokens', require('./api/token'));
  app.use('/api/scores', require('./api/score'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  app.post('/api/email', function (req, res, next) {
    var email = req.body;
    app.mailer.send('email', email, function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
    });
  });
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
