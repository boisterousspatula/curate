/**
 * Guide Controller
 */


'use strict';

var db = require('../config/database');
var Guide = db.guide;

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

// {
//   title: 'guide title',
//   description: 'guide description',
//   sections: [{title: 'section title', description:'section description', links: [{url: 'link url'}]}
//             ,{title: 'section title', description:'section description', links: [{url: 'link url'}]}
// }


var createGuide = function(req, res, next) {
  // add assert for requiring a title to the guide
  console.log('createGuide controller POST response');
  var dummyGuide = {
    title: 'How to learn Flux & React',
    description: 'description stuff',
    sections: [{title: 'react stuff', description:'learn react', links:[{title: 'react link', url:'http://reactjs.com'}]}]
  };

  var guide = req.body;
  console.log('createGuide controller POST req.body', req.body);

  Guide.create(guide).success(function(guide) {
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

/*
  req.body =
  {
    title: [ 'Test Guide', 'Test Guide 2' ],
    description: [ 'test', 'test2' ],
    link: [ 'www.test.com', 'www.facebook.com' ]
  }
 */










