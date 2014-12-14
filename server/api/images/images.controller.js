'use strict';

var _ = require('lodash');
var Images = require('./images.model');
var url = require('url');
var fs = require('fs');
var config = require('../../config/environment');

// Get list of imagess
exports.index = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var code = query.url.hashCode();
  var img = fs.readFileSync(config.imageLocation + (code % 10000).toString() + '/' + code.toString() + '.jpeg');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
};

// Get a single images
exports.show = function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.send(404); }
    return res.json(images);
  });
};

// Creates a new images in the DB.
exports.create = function(req, res) {
  Images.create(req.body, function(err, images) {
    if(err) { return handleError(res, err); }
    return res.json(201, images);
  });
};

// Updates an existing images in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Images.findById(req.params.id, function (err, images) {
    if (err) { return handleError(res, err); }
    if(!images) { return res.send(404); }
    var updated = _.merge(images, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, images);
    });
  });
};

// Deletes a images from the DB.
exports.destroy = function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.send(404); }
    images.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length == 0) return hash;
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  if(hash < 0) {
    hash = hash * -1;
  }
  return hash;
}