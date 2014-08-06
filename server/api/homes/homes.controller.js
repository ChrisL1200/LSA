'use strict';

var _ = require('lodash');

// Get list of homess
exports.index = function(req, res) {
  var bounds = req.body.bounds;

};

// Get a single homes
exports.show = function(req, res) {
  
};

// Creates a new homes in the DB.
exports.create = function(req, res) {
  
};

// Updates an existing homes in the DB.
exports.update = function(req, res) {
  
};

// Deletes a homes from the DB.
exports.destroy = function(req, res) {
  
};

function handleError(res, err) {
  return res.send(500, err);
}