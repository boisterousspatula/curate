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

/**
 * GET /vote/user
 * Read users guide data
 */
var getLinkVoteByUser = function (req, res, next) {
	LinkVote.findAll({
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
	getVote: getLinkVoteByUser
};
