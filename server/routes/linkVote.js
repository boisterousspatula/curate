/**
 * linkVote Routes
 */

'use strict';

var linkVoteController = require('../controllers/linkVote');

var routes = function(app) {

  //Cast vote
  app.post('/linkVote', linkVoteController.castVote);

	//Get votes
	app.get('/guideVote', linkVoteController.getVote);
};

module.exports = routes;
