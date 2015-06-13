/**
 * guideVote Routes
 */

'use strict';

var guideVoteController = require('../controllers/guideVote');
var auth = require('../auth');

var routes = function(app) {

  //Cast vote
  app.post('/guideVote' ,auth.isAuthenticated, guideVoteController.castVote);

	//Get votes
	app.get('/guideVote' ,auth.isAuthenticated, guideVoteController.getVoteByUser);
};

module.exports = routes;
