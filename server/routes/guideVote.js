/**
 * guideVote Routes
 */

'use strict';

var guideVoteController = require('../controllers/guideVote');

var routes = function(app) {

  //Cast vote
  app.post('/guideVote', guideVoteController.castVote);
};

module.exports = routes;
