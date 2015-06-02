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

/**
 * GET /vote/user
 * Read users guide data
 */
var getVoteByUser = function (req, res, next) {
	GuideVote.findAll({
		where: {
			// need to have front end send userId from localStorage
			userId: req.headers.userid
		}
	})
		.then(function(votes) {
			// console.log(guides);
			if (!votes) {
				return res.status(400).json({
					errors: [{
						msg: 'Failed to find guide votes for user.'
					}]
				});
			}
			res.status(200).json({
				votes: votes
			});
		}).error(function(err) {
			return next(err);
		});
};

module.exports = {
  castVote: castVote,
	getVoteByUser: getVoteByUser
};
