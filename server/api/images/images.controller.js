'use strict';

var _ = require('lodash');
var Images = require('./images.model');
var url = require('url');
var fs = require('fs');

// Get list of imagess
exports.index = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  // Images.findOne({url: query.url})
  // .lean()
  // .exec(function (err, doc) {
  //   if (err) return next(err);
  //   console.log(Object.keys(doc));
  //   if(doc && doc.img) {
  //   console.log("2");
  //   console.log(Object.keys(doc.img));
  //   // console.log(doc.img.contentType);
  //     res.contentType(doc.img.contentType);
  //     res.send(doc.img.data);
  //   }
  // });
  var img = fs.readFileSync('../lsa-ingest/images/' + query.url);
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