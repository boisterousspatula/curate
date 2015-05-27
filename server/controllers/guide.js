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
  // fill in GET for guide here
};

/**
 * POSt /guide
 * Create a new guide
 * @param title
 * @param sections
 * @param links
 * @param comments ?
 */

var createGuide = function(req, res, next) {
  // add assert for requiring a title to the guide

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










