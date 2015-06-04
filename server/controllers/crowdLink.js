/*
* CrowdLink Controller
*/

'use strict';

var db = require('../config/database');
var CrowdLink = db.crowdLink;

/**
 * POST /addCrowdLink
 * Add crowdLink to the crowdLinks of a section
 * @param userId
 * @param sectionId
 * @param url
 */

var addCrowdLink = function(req, res, next) {
  var url = req.link || 'http://learndatjs.com';
  var userId = req.userId || 1;
  var sectionId = req.sectionId || 5;

  CrowdLink.create({
    userId: userId,
    sectionId: sectionId,
    url: url
  })
  .then(function(crowdLink) {
    res.status(200).json({
      crowdLink: crowdLink,
      success: [{
        msg: 'CrowdLink created successfully.'
      }]
    });
  })
  .error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  addCrowdLink: addCrowdLink
};