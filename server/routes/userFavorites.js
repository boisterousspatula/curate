/**
 * UserFavorites Routes
 */

'use strict';

var userFavoritesController = require('../controllers/userFavorites');
var auth = require('../auth');
var routes = function(app) {

  // Create User Favorites
  app.post('/userFavorites',auth.isAuthenticated, userFavoritesController.toggleUserFavorite);

  // Read All of a User's Favorites
  app.get('/userFavorites',auth.isAuthenticated, userFavoritesController.readUserFavorites);
};

module.exports = routes;