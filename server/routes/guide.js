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

  // Read Single Users Guides
  app.get('/guide/user', guideController.readUserGuides);

  // Read Entire Single Guide by Id
  app.get('/guide/single', guideController.readIndividualGuide);
};

module.exports = routes;