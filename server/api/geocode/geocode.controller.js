'use strict';

var https = require('https'),
    url = require('url');

// Get a single geocode
exports.index = function(req, res) {
    var url_parts = url.parse(req.url, true);
  var options = {
    host: 'maps.googleapis.com',
    port: 443,
    path: '/maps/api/geocode/json?key=AIzaSyCc2xSsYmFpNiHcRk-DuHkSVVxi9Rt9xFA&components=country:us&sensor=false&address=' + url_parts.query.address
  };
  var callback = function(response) {
    if (response.statusCode === 200) {
      res.writeHead(200, {
          'Content-Type': response.headers['content-type']
      });
      response.pipe(res);
    } else {
      res.writeHead(response.statusCode);
      res.end();
    }
  };

  https.request(options, callback).end();
};