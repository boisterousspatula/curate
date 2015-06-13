'use strict';

var passport = require('passport');
var secrets = require('../config/secrets');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var validateJwt = expressJwt({ secret: secrets.sessionSecret });
var db = require('../config/database');
var User = db.user;
var localStrategy = require('./strategies/local');

/**
 * Initialize passport serialization/deserialization
 */
var init = function(User) {
	console.log('IN Init', User);
  passport.serializeUser(function(user, done) {
		console.log('IN serialize', user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.find(id).success(function(user) {
			console.log('inside user deserialize', user);
      done(null, user);
    }).error(function(err) {
      done(err);
    });
  });

  // Setup Passport strategies
  localStrategy(User);
};

/**
 * Check to see if user is authenticated
 */
var isAuthenticated = function(req, res, next) {
  // allow access_token to be passed through query parameter as well
  if (req.body && req.body.hasOwnProperty('access_token')) {
		console.log('before auth', req.headers.authorization);
    req.headers.authorization = 'Bearer ' + req.body.access_token;
		console.log('after auth', req.headers.authorization);
  }

	console.log('inside user is Authd', req.body.access_token);
  // Validate jwt token
  return validateJwt(req, res, next);
};

/**
 * Check to see if user is authenticated
 */
var getUser = function(req, res, next) {
	// allow access_token to be passed through query parameter as well
	if (req.body && req.body.hasOwnProperty('access_token')) {

		req.headers.authorization = 'Bearer ' + req.body.access_token;
	}

	// Validate jwt token
	return jwt.decode();
};

/**
 * Checks if the user role meets the minimum requirements of the route
 */
var hasRole = function(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  function meetsRequirements(req, res, next) {
    if (secrets.userRoles.indexOf(req.user.role) >= secrets.userRoles.indexOf(roleRequired)) {
      next();
    } else {
      res.send(403);
    }
  }
  return meetsRequirements;
};

/**
 * Returns a jwt token signed by the app secret
 */
var signToken = function(id) {
  return jwt.sign({
    id: id,
  }, secrets.sessionSecret, {
    expiresInMinutes: 60 * 24 // 24 hours
  });
};

/**
 * Set token cookie directly for oAuth strategies
 */
var setTokenCookie = function(req, res) {
  if (!req.user) {
    return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
  }
  var token = signToken(req.user.id, req.user.role);
  res.cookie('token', JSON.stringify(token));
};

module.exports = {
  init: init,
  isAuthenticated: isAuthenticated,
	getUser: getUser,
  hasRole: hasRole,
  signToken: signToken,
  setTokenCookie: setTokenCookie
};
