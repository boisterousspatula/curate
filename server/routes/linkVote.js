/**
 * linkVote Routes
 */

'use strict';

var linkVoteController = require('../controllers/linkVote');

var routes = function(app) {

  //Cast vote
  app.post('/linkVote', linkVoteController.castVote);
};

module.exports = routes;