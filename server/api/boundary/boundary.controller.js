'use strict';

var _ = require('lodash');
var Boundary = require('./boundary.model');

// Get list of boundarys
exports.index = function(req, res) {
  Boundary.find(function (err, boundarys) {
    if(err) { return handleError(res, err); }
    return res.json(200, boundarys);
  });
};

// Get a single boundary
exports.show = function(req, res) {
  Boundary.findById(req.params.id, function (err, boundary) {
    if(err) { return handleError(res, err); }
    if(!boundary) { return res.send(404); }
    return res.json(boundary);
  });
};

// Creates a new boundary in the DB.
exports.create = function(req, res) {
  Boundary.create(req.body, function(err, boundary) {
    if(err) { return handleError(res, err); }
    return res.json(201, boundary);
  });
};

// Updates an existing boundary in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Boundary.findById(req.params.id, function (err, boundary) {
    if (err) { return handleError(err); }
    if(!boundary) { return res.send(404); }
    var updated = _.merge(boundary, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, boundary);
    });
  });
};

// Deletes a boundary from the DB.
exports.destroy = function(req, res) {
  Boundary.findById(req.params.id, function (err, boundary) {
    if(err) { return handleError(res, err); }
    if(!boundary) { return res.send(404); }
    boundary.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}