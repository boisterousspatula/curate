/**
 * Express configuration
 */
'use strict';

var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var passport = require('passport');
var auth = require('../auth');
var session = require('express-session');

// Configuration files
var secrets = require('./secrets');
var settings = require('./env/default');
var security = require('./security');

var expressConfig = function(app, express, db) {

  var hour = 3600000;
  var day = hour * 24;
  var week = day * 7;

  // Get current server environment
  var env = app.get('env');

  // Remove x-powered-by header (doesn't let clients know we are using Express)
  app.disable('x-powered-by');

  // Setup port for server to run on
  app.set('port', settings.server.port);

   // Setup view engine for server side templating
  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');

  // Setup path where all server templates will reside
  app.set('views', path.join(settings.root, 'server/templates'));

  // Enable GZip compression for all static assets
  app.use(compress());

  if (env === 'development') {
    // Include livereload script on all pages
    app.use(require('connect-livereload')());
    // Load bower_components
    app.use(express.static(path.join(settings.root, '.tmp'), {maxAge: 0}));
    app.use('/bower_components', express.static(path.join(settings.root, 'client/bower_components'), {maxAge: 0}));

    // Load static assets with no-cache
    app.use(express.static(path.join(settings.root, settings.staticAssets), {maxAge: 0}));
  }
  // Load favicon
  app.use(favicon(path.join(settings.root, settings.staticAssets, '/favicon.ico')));
  if (env !== 'development') {
    // Load static assets cached
    app.use(express.static(path.join(settings.root, settings.staticAssets), {maxAge: week}));
  }

  // Returns middleware that parses both json and urlencoded.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Returns middleware that parses cookies
  app.use(cookieParser());

  // Initialize form validation
  app.use(expressValidator());

  /**
   * Enable HTTP Method Overrides (POST, GET, DELETE, PUT, etc)
   * Override HTML forms with method="POST" using ?_method=PUT at the end of action URLs
   * ex <form method="POST" action="/someurl?_method=PUT">
   */
  app.use(methodOverride('_method'));

  // override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

  /**
   * Create cookie that keeps track of user sessions
   */
  app.use(session({
    secret: secrets.sessionSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true, // Only server can manipulate cookies
      maxAge: day
    }
  }));

  // Initialize Authentication
  auth.init(db.user);
  app.use(passport.initialize());
  app.use(passport.session());

  // Initialize server validation flash messages
  app.use(flash());

  // Initialize Security
  app.use(security);

  app.use(function(req, res, next) {
    // Make Node environment available in templates
    res.locals.env = env;
    // Make user object available in templates.
    res.locals.user = req.user;
    next();
  });

  /**
   * Remember original destination before login.
   * Go back to that original destination once successfully logged in
   * (Unless specified in the ignoredPaths array)
   */
  app.use(function(req, res, next) {
    var path = req.path.split('/')[1];
    var regExp = new RegExp(settings.server.loginIgnorePaths.join('|'), 'i');
    if (regExp.test(path)) {
      return next();
    }
    req.session.returnTo = req.path;
    next();
  });

  // Setup log level for server console output
  app.use(logger(settings.server.logLevel));

  if (env === 'development') {

    // Disable caching for easier testing
    app.use(function noCache(req, res, next) {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.header('Pragma', 'no-cache');
      res.header('Expires', 0);
      next();
    });
  }

  // Load routes
  require(path.join(settings.root,'./server/routes'))(app);

  // 404 Error Handler
  app.use(function(req, res) {
    res.status(404);
    res.format({
      html: function() {
        res.render('error', {
          status: 404,
          message: 'Page not found',
          error: {}
        });
      },
      json: function() {
        res.json({
          status: 404,
          message: 'Page not found',
          error: {}
        });
      },
      text: function() {
        res.send(404 + ': ' + 'Page not found');
      }
    });
  });

  if (env === 'development') {
    // Development Error Handler.
    // Log out stack trace
    return app.use(errorHandler());
  }

  // Production Error Handler.
  app.use(function(err, req, res, next) {

    var error = err.error || err;
    var message = err.message;
    var status = err.status || 500;

    res.status(status);
    res.format({
      html: function() {
        res.render('error', {
          status: status,
          message: message,
          error: {}
        });
      },
      json: function() {
        res.json({
          status: status,
          message: message,
          error: {}
        });
      },
      text: function() {
        res.send(status + ': ' + message);
      }
    });
  });


};

module.exports = expressConfig;
