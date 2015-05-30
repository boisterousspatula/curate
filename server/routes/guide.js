/**
 * Guide Routes
 */

'use strict';

var guideController = require('../controllers/guide');

var routes = function(app) {

  // Create
  app.post('/guide', guideController.createGuide);

  // Read All Guides
  app.get('/guide', guideController.readGuides);

  // Read Single User Guides
  app.get('/guide/user', guideController.readUserGuides);
};

module.exports = routes;