'use strict';

var _ = require('lodash');
var School = require('./school.model');
var url = require('url');
var inside = require('point-in-polygon');

// Get list of schools
exports.index = function(req, res) {
  School.find(function (err, schools) {
    if(err) { return handleError(res, err); }
    return res.json(200, schools);
  });
};

// Get a single school
exports.show = function(req, res) {
  School.findById(req.params.id, function (err, school) {
    if(err) { return handleError(res, err); }
    if(!school) { return res.send(404); }
    return res.json(school);
  });
};

exports.create = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  // {"ed_level": new RegExp(query.gradeLevel)}
  var schoolQuery = School.find().lean().limit(5).sort({'score.overall': -1});
  _.each(req.body.queries, function(query) {
    switch(query.type) {
      case 'equals':
        if(!query.caseSensitive) {
          query.value = query.value.toUpperCase();
        }
        schoolQuery.where(query.key).equals(query.value);
        break;
      case 'range':
        schoolQuery.where(query.key).gt(parseFloat(query.min)).lt(parseFloat(query.max));
        break;
      case 'min':
        schoolQuery.where(query.key).gt(parseFloat(query.value))
        break;
      case 'max':
        schoolQuery.where(query.key).lt(parseFloat(query.value))
        break;
      default:
        break;
    }
  });
  // if(query.southwestLat && query.northeastLat && query.southwestLong && query.northeastLong) {  
  //   schoolQuery.where('coordinates.latitude').gt(parseFloat(query.southwestLat)).lt(parseFloat(query.northeastLat))
  //   schoolQuery.where('coordinates.longitude').gt(parseFloat(query.southwestLong)).lt(parseFloat(query.northeastLong))
  // }
  schoolQuery.exec(function (err, schools) {
    if(err) { return handleError(res, err); }
    var filteredSchools = [];
    var polygonsPresent = req.body.polygons && req.body.polygons.length > 0;
    if(polygonsPresent) {
      _.each(req.body.polygons, function(poly) {
        _.each(schools, function(school) {
          if(inside([school.coordinates.latitude, school.coordinates.longitude], poly)) {
            filteredSchools.push(school);
          }
        });
      });
    }
    return res.json(200, polygonsPresent ? filteredSchools : schools);
  });  
};

// Updates an existing school in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  School.findById(req.params.id, function (err, school) {
    if (err) { return handleError(err); }
    if(!school) { return res.send(404); }
    var updated = _.merge(school, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, school);
    });
  });
};

// Deletes a school from the DB.
exports.destroy = function(req, res) {
  School.findById(req.params.id, function (err, school) {
    if(err) { return handleError(res, err); }
    if(!school) { return res.send(404); }
    school.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}