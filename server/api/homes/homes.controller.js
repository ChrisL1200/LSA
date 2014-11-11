'use strict';

var _ = require('lodash');
var Homes = require('./homes.model');
var url = require('url');
var inside = require('point-in-polygon');

// Get list of homess
exports.index = function(req, res) {
    console.log("zoob");
  return res.json(200, []); 
};

// Get a single homes
exports.show = function(req, res) {
  console.log("SHOW");  
};

// Creates a new homes in the DB.
exports.create = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Homes.find()
  .limit(25)
  .where('listing.location.latitude').gt(query.southwestLat).lt(query.northeastLat)
  .where('listing.location.longitude').gt(query.southwestLong).lt(query.northeastLong)
  .exec(function (err, homes) {
    if(err) { return handleError(res, err); }
    var filteredHomes = [];
    var polygonsPresent = req.body.polygons && req.body.polygons.length > 0;
    if(polygonsPresent) {
      _.each(req.body.polygons, function(poly) {
        _.each(homes, function(home) {
          if(inside([home.coordinates.latitude, home.coordinates.longitude], poly)) {
            filteredScores.push(home);
          }
        });
      });
    }
    return res.json(200, polygonsPresent ? filteredHomes : homes);
  }); 
};

// Updates an existing homes in the DB.
exports.update = function(req, res) {
  console.log("update");  
  
};

// Deletes a homes from the DB.
exports.destroy = function(req, res) {
  
};

function handleError(res, err) {
  return res.send(500, err);
}