/**
 * Guide Routes
 */

'use strict';

var commentController = require('../controllers/comment');
var auth = require('../auth');
var routes = function(app) {

  // Create
  app.post('/comment',auth.isAuthenticated, commentController.comment);

};

module.exports = routes;