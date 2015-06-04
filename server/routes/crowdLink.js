/**
 * crowdLink Routes
 */

'use strict';

var crowdLinkController = require('../controllers/crowdLink');

var routes = function(app) {

  //Cast vote
  app.post('/addCrowdLink', crowdLinkController.addCrowdLink);

  //Get votes
  // app.get('/guideVote', linkVoteController.getVote);
};

module.exports = routes;
