/*
* LinkVote Controller
*/

'use strict';

var db = require('../config/database');
var LinkVote = db.linkVote;

var castVote = function(req, res, next) {

  LinkVote.find({
    where:{
      linkId: req.body.linkId,
      userId: req.body.userId
    }
  })
  .success(function(vote){
    if(!vote) {
      LinkVote.create({
        userId: req.body.userId,
        guideId: req.body.guideId,
        linkId: req.body.linkId,
        val: req.body.val
      });
    } else {
      vote.val = req.body.val;
      vote.save().success(function(){
        res.status(200).json({
          success: [{
            msg: 'Updated vote.'
          }]
        });
      }).error(function(err){
        if(err) {
          return next(err);
        }
      }).error(function(err){
        if(err) {
          return next(err);
        }
      });
    }
  }).error(function(err){
    if(err) {
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
			userId: req.user.id
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
