/**
 * Guide Routes
 */

'use strict';

var commentController = require('../controllers/comment');

var routes = function(app) {

  // Create
  app.post('/comment', commentController.comment);

};

module.exports = routes;