'user strict';
var db = require('../config/database');
var UserFavorites = db.userFavorites;
var Guide = db.guide;
var Section = db.section;
var Link = db.link;

/**
 * POST /userFavorites
 * @param guideId
 * @param userId
 * @param sectionId
 * @param linkId
 */

var addToUserFavorites = function(req, res, next) {
  var userId = req.userId || 1;
  req.guide = {id:1};


  UserFavorites.findOrCreate({
    userId: userId
  })
  .then(function(userFavorites) {
    if (req.guide) {
      Guide.find({ where: { 
        id: req.guide.id
      }})
      .then(function(guide) {
        userFavorites.addGuide(guide);
      })
    } else if (req.section) {
      Section.find({ where: { 
        id: req.section.id
      }})
      .then(function(section) {
        userFavorites.addSection(section);
      })
    } else if (req.link) {
      Link.find({ where: { 
        id: req.link.id
      }})
      .then(function(link) {
        userFavorites.addLink(link);
      })
    }
  })
  .then(function(userFavorites) {
    res.status(200).json({
      userFavorites: userFavorites,
      success: [{
        msg:'UserFavorites updated successfully.'
      }]
    });
  })
  .error(function(err) {
    if (err) {
      return next(err);
    }
  })
};

/**
 * GET /userFavorites
 * Gets all users favorite guides
 */

var readUserFavorites = function(req, res, next) {
  UserFavorites.find({
    where: {
      userId: req.userId // TODO: check this piece of req
    }
  })
  .then(function(userFavorites) {
    // TODO: Need to figure out how to get all of users
    // favorite guides, sections and links
  });
};

module.exports = {
  readUserFavorites: readUserFavorites,
  addToUserFavorites: addToUserFavorites
};
