'use strict';

var _ = require('lodash');

// Get list of homess
exports.index = function(req, res) {
  console.log("index");  
    return res.json(200, []); 

};

// Get a single homes
exports.show = function(req, res) {
  console.log("SHOW");  
};

// Creates a new homes in the DB.
exports.create = function(req, res) {
  console.log("create");  
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