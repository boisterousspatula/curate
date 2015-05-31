/*
* GuideVote Controller
*/

'use strict';

var db = require('../config/database');
var GuideVote = db.guideVote;

var castVote = function(req, res, next) {
  var voteContract = req.body;
  var dummyVoteContract = {
    guideId: 1,
    userId: 1,
    val: 1
  };

  GuideVote.create({
    guideId: dummyVoteContract.guideId,
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
  castVote: castVote
};
