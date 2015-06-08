/**
 * UserFavorites Routes
 */

'use strict';

var userFavoritesController = require('../controllers/userFavorites');

var routes = function(app) {

  // Create User Favorites
  app.post('/userFavorites', userFavoritesController.toggleUserFavorite);

  // Read All of a User's Favorites
  app.get('/userFavorites', userFavoritesController.readUserFavorites);
};

module.exports = routes;