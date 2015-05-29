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
var readGuide = function (req, res, next) {
  // need to find correct guide by id now
  Guide.findAll().then(function(guides) {
    console.log(guides);
    if (!guides) {
      return res.status(400).json({
        errors: [{
          msg: 'Failed to find guide'
        }]
      });
    }
    res.status(200).json({
      guide: guides
    });
  }).error(function(err) {
    return next(err);
  });

  console.log('readGuide controller GET response');
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
  var dummyReq = {
    title: 'How to learn Flux & React',
    description: 'description stuff',
    sections: [
      {
        title: 'react stuff',
        description:'learn react',
        links:
          [
            {title: 'react link', url:'http://reactjs.com'}
          ]
      }
    ],
    userId: 1
  };

  console.log('createGuide controller POST req.body', req.body);
  var guide = req.body;

  //Save guide data
  Guide.create({ //create guide entry
    title: dummyReq.title,
    description: dummyReq.description,
    userId: dummyReq.userId
  })
  .then(function(guide){
    //create section obj with guide id
    var guideId = guide.get('id');
    dummyReq.sections.forEach(function(section){
      Section.create({
        title: section.title,
        description: section.description,
        guideId: guideId,
      })
      //create link entry with its section id
      .then(function(newSection){
        var sectionId = newSection.get('id');
        console.log('newSection', newSection);
        console.log('newSection.links', newSection.links);
        console.log('section', section);
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
  readGuide: readGuide,
  createGuide: createGuide
};

