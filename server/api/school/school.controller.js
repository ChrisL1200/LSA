'use strict';

var _ = require('lodash');
var School = require('./school.model');

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

// Creates a new school in the DB.
exports.create = function(req, res) {
  School.create(req.body, function(err, school) {
    if(err) { return handleError(res, err); }
    return res.json(201, school);
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