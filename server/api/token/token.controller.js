'use strict';

var _ = require('lodash');
var Token = require('./token.model');

// Get list of tokens
exports.index = function(req, res) {
  Token.find(function (err, tokens) {
    if(err) { return handleError(res, err); }
    return res.json(200, tokens);
  });
};

// Get a single token
exports.show = function(req, res) {
  Token.findById(req.params.id, function (err, token) {
    if(err) { return handleError(res, err); }
    if(!token) { return res.send(404); }
    return res.json(token);
  });
};

// Creates a new token in the DB.
exports.create = function(req, res) {
  Token.create(req.body, function(err, token) {
    if(err) { return handleError(res, err); }
    return res.json(201, token);
  });
};

// Updates an existing token in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Token.findById(req.params.id, function (err, token) {
    if (err) { return handleError(err); }
    if(!token) { return res.send(404); }
    var updated = _.merge(token, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, token);
    });
  });
};

// Deletes a token from the DB.
exports.destroy = function(req, res) {
  Token.findById(req.params.id, function (err, token) {
    if(err) { return handleError(res, err); }
    if(!token) { return res.send(404); }
    token.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}