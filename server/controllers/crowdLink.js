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
	console.log('add link', req.body);
  var url = req.body.url || 'http://learndatjs.com';
  var userId = req.headers.userid || 1;
  var sectionId = req.body.sectionId || 2;

  CrowdLink.create({
		title: req.body.linkTitle,
		//description: req.description,
		type: req.body.contentTypes,
		duration : req.body.linkDuration,
		voteTotal: req.body.votes || 0,
    userId: userId,
    sectionId: sectionId,
    url: url
  })
  .then(function(crowdLink) {
		crowdLink.dataValues.linkTitle = crowdLink.title;
		crowdLink.selectedValues.linkTitle = crowdLink.title;
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
