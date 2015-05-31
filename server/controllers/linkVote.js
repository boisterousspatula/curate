/*
* LinkVote Controller
*/

'use strict';

var db = require('../config/database');
var LinkVote = db.linkVote;

var castVote = function(req, res, next) {
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
  castVote: castVote
};
