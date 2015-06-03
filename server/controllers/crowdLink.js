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
 * @param url
 */

var addCrowdLink = function(req, res, next) {
  var url = blah;




  var voteContract = req.body;
  var dummyVoteContract = {
    linkId: 1,
    userId: 1,
    val: 1
  };

  LinkVote.create({
    linkId: dummyVoteContract.linkId,
    userId: dummyVoteContract.userId,
    val: dummyVoteContract.val
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