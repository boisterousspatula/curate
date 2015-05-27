/**
 * Guide Routes
 */

'use strict';

var guideController = require('../controllers/guide');

var routes = function(app) {

  // Create
  app.post('/guide', guideController.createGuide);

  // Read
  app.get('/guide', guideController.readGuide);
};

module.exports = routes;