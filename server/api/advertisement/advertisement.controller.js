'use strict';

var _ = require('lodash');
var Advertisement = require('./advertisement.model');

// Get list of advertisements
exports.index = function(req, res) {
  Advertisement.find(function (err, advertisements) {
    if(err) { return handleError(res, err); }
    return res.json(200, advertisements);
  });
};

// Get a single advertisement
exports.show = function(req, res) {
  Advertisement.findById(req.params.id, function (err, advertisement) {
    if(err) { return handleError(res, err); }
    if(!advertisement) { return res.send(404); }
    return res.json(advertisement);
  });
};

// Creates a new advertisement in the DB.
exports.create = function(req, res) {
  Advertisement.create(req.body, function(err, advertisement) {
    if(err) { return handleError(res, err); }
    return res.json(201, advertisement);
  });
};

// Updates an existing advertisement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Advertisement.findById(req.params.id, function (err, advertisement) {
    if (err) { return handleError(res, err); }
    if(!advertisement) { return res.send(404); }
    var updated = _.merge(advertisement, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, advertisement);
    });
  });
};

// Deletes a advertisement from the DB.
exports.destroy = function(req, res) {
  Advertisement.findById(req.params.id, function (err, advertisement) {
    if(err) { return handleError(res, err); }
    if(!advertisement) { return res.send(404); }
    advertisement.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}