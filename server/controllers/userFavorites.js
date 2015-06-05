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
  console.log('UserID: ', req.headers.userid);

  var userId = req.headers.userid || 1;
  console.log('GuideId: ', req.body.guideId);
  // // req.guide = {id:1};
  // // console.log(req);
  // console.log(Console.log('req', req.guideIdToSend);
  // console.log('User ID: ', userId);
  UserFavorites.findOrCreate({
    userId: userId
  })
  .then(function(userFavorites) {
    if (req.body.guideId) {
      Guide.find({ where: { 
        id: req.body.guideId
      }})
      .then(function(guide) {
        userFavorites.addGuide(guide);
      })
    } else if (req.body.sectionId) {
      Section.find({ where: { 
        id: req.body.sectionId
      }})
      .then(function(section) {
        userFavorites.addSection(section);
      })
    } else if (req.body.linkId) {
      Link.find({ where: { 
        id: req.body.linkId
      }})
      .then(function(link) {
        userFavorites.addLink(link);
      })
    } else {
      return res.status(400).json({
        errors: [{
          msg: 'Request not formatted properly.'
        }]
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
  var allUserFavorites = {};

  UserFavorites.findAll({
    where: {
      userId:  req.headers.userid
    },
		include: [
			{ model: Guide },
			{ model: Section },
			{ model: Link}
			]
	})
  .then(function(userFavorites) {
		allUserFavorites = userFavorites;
		res.status(200).json({
			userFavorites: allUserFavorites,
			success: [{
				msg: 'UserFavorites sent successfully.'
			}]
		});
  })
  .error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  readUserFavorites: readUserFavorites,
  addToUserFavorites: addToUserFavorites
};
