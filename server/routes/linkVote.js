/**
 * linkVote Routes
 */

'use strict';

var linkVoteController = require('../controllers/linkVote');
var auth = require('../auth');
var routes = function(app) {

  //Cast vote
  app.post('/linkVote',auth.isAuthenticated, linkVoteController.castVote);

	//Get votes
	app.get('/guideVote',auth.isAuthenticated, linkVoteController.getVote);
};

module.exports = routes;
