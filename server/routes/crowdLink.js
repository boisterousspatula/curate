/**
 * crowdLink Routes
 */

'use strict';

var crowdLinkController = require('../controllers/crowdLink');
var auth = require('../auth');
var routes = function(app) {

  //Cast vote
  app.post('/addCrowdLink',auth.isAuthenticated, crowdLinkController.addCrowdLink);

  //Get votes
  // app.get('/guideVote', linkVoteController.getVote);
};

module.exports = routes;
