/**
 * Guide Controller
 */


'use strict';

var db = require('../config/database');
var Guide = db.guide;

/**
 * GET /guide
 * Read guide data
 */
var readGuide = function (req, res, next) {
  // need to find correct guide by id now
  Guide.find(req.guide).success(function(guide) {
    if (!guide) {
      return res.status(400).json({
        errors: [{
          msg: 'Failed to find guide'
        }]
      });
    }
    res.status(200).json({
      guide: guide
    });
  }).error(function(err) {
    return next(err);
  });

  console.log("readGuide controller GET response");
};

/**
 * POST /guide
 * Create a new guide
 * @param title
 * @param sections
 * @param links
 * @param comments ?
 */
var createGuide = function(req, res, next) {
  // add assert for requiring a title to the guide
  console.log("readGuide controller POST response");
  var guide = {
    // need to add real params for guide once we know how data is passed

    // Dummy data here
    title: "How to learn Flux & React"
  };

  Guide.create(guide).success(function(guide) {
    res.status(200).json({
      guide: guide,
      success: [{
        msg: "Guide created successfully."
      }]
    });
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  readGuide: readGuide,
  createGuide: createGuide
};










