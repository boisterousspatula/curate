/**
 * Guide Routes
 */

'use strict';

var guideController = require('../controllers/guide');

var routes = function(app) {

  // Create
  app.post('/guide', guideController.createGuide);

  // Read All Guides
  app.get('/guide', guideController.readGuide);

  // Read Single User Guides
  app.get('/guide/user', guideController.readUserGuide);
};

module.exports = routes;