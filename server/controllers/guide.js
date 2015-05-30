/**
 * Guide Controller
 */

'use strict';

var db = require('../config/database');
var Guide = db.guide;
var Section = db.section;
var Link = db.link;
var User = db.user;

/**
 * GET /guide
 * Read guide data
 */
var readGuides = function (req, res, next) {
  // need to find correct guide by id now
  // console.log('GET all guides:Cookie -', req.checkBody());

  Guide.findAll().then(function(guides) {
    // console.log(guides);
    if (!guides) {
      return res.status(400).json({
        errors: [{
          msg: 'Failed to find guides.'
        }]
      });
    }
    res.status(200).json({
      guide: guides
    });
  }).error(function(err) {
    return next(err);
  });

  console.log('Guides successfully retrieved.');
};

/**
 * GET /guide/user
 * Read users guide data
 */
var readUserGuides = function (req, res, next) {
  Guide.findAll({
    where: {
      // need to have front end send userId from localStorage
      userId: req.userId
    }
  })
  .then(function(guides) {
    // console.log(guides);
    if (!guides) {
      return res.status(400).json({
        errors: [{
          msg: 'Failed to find guides.'
        }]
      });
    }
    res.status(200).json({
      guide: guides
    });
  }).error(function(err) {
    return next(err);
  });
};


/**
 * POST /guide
 * Create a new guide
 * @param title
 * @param sections
 * @param links
 * @param comments ?
 */

var createGuide = function(req, res, next) {
  // add assert for requiring a title to the guide
  console.log('createGuide controller POST response');
  var guideModel = {
    title: 'How to learn Flux & React',
    description: 'description stuff',
    sections: [
      {
        title: 'react stuff',
        description:'learn react',
        links:
          [
            {title: 'react link',
            url:'http://reactjs.com',
            votes:null}
          ]
      }
    ],
    userId: 1, //passed from front end
    category: 'recipes',
    votes: null, //will be populated in read state
    comments: null //will be populated in read state
  };
  // var dummyReq = {
  //   title: 'How to learn Flux & React',
  //   description: 'description stuff',
  //   sections: [
  //     {
  //       title: 'react stuff',
  //       description:'learn react',
  //       links:
  //         [
  //           {title: 'react link', url:'http://reactjs.com'}
  //         ]
  //     }
  //   ],
  //   userId: 1
  // };

  console.log('createGuide controller POST req.body', req.body);
  var guide = req.body;

  //Save guide data
  Guide.create({ //create guide entry
    title: guideModel.title,
    description: guideModel.description,
    userId: guideModel.userId
  })
  .then(function(guide){
    //create section obj with guide id
    var guideId = guide.get('id');
    guideModel.sections.forEach(function(section){
      Section.create({
        title: section.title,
        description: section.description,
        guideId: guideId,
      })
      //create link entry with its section id
      .then(function(newSection){
        var sectionId = newSection.get('id');
        section.links.forEach(function(link){
          Link.create({
            title: link.title,
            url: link.url,
            sectionId: sectionId
          });
        });
      });
    });
  })
  .then(function(guide) {
    res.status(200).json({
      guide: guide,
      success: [{
        msg: 'Guide created successfully.'
      }]
    });
  }).error(function(err) {
    if (err) {
      return next(err);
    }
  });
};

module.exports = {
  readGuides: readGuides,
  readUserGuides: readUserGuides,
  createGuide: createGuide
};

