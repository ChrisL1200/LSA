'use strict';

var https = require('https'),
    _ = require('lodash'),
    url = require('url');

// Get a single geocode
exports.index = function(req, res) {
    var url_parts = url.parse(req.url, true);
  var options = {
    host: 'maps.googleapis.com',
    port: 443,
    path: '/maps/api/geocode/json?key=AIzaSyCc2xSsYmFpNiHcRk-DuHkSVVxi9Rt9xFA&sensor=false'
  };
  // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=API_KEY
  _.each(url_parts.query, function(val, key) {
    options.path += '&' + key + '=' + val;
  });

  if(url_parts.query.address) {
    options.path += '&components=country:us';
  }
  
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