/**
 * Guide Controller
 */

'use strict';

var db = require('../config/database');
var Guide = db.guide;
var Section = db.section;
var Link = db.link;
var User = db.user;
var GuideVote = db.guideVote;
var LinkVote = db.linkVote;
var Comment = db.comment;
var Category = db.category;

/**
 * GET /guide
 * Read all guide data
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
 * GET /guide/single
 * Read entire single guide
 */
var readIndividualGuide = function (req, res, next) {
  var individualGuide = {};
  var guideId = req.body.guideId || 1; // TODO: eventually needs to be req.body.guideId

  Guide.find({
    where: {
      id: guideId
    }
  })
  .then(function(guide) {

    if (!guide) {
      return res.status(400).json({
        errors: [{
          msg: 'Failed to find guide.'
        }]
      });
    }

    individualGuide.title = guide.guideTitle;
    individualGuide.description = guide.guideDescription;
    individualGuide.sections = [];
    individualGuide.userId = guide.userId;
    individualGuide.userEmail = '';
    individualGuide.category = '';
    individualGuide.votes = 0;
    individualGuide.comments = [];

    Section.findAll({ // find all sections of the guide
      where: {
        guideId: guide.id
      }
    })
    .then(function(sections) {

      sections.forEach(function(section) {
        var currentSection = {};
        currentSection.title = section.title;
        currentSection.description = section.description;
        currentSection.links = [];

        Link.findAll({ // find all links of the section
          where: {
            sectionId: section.id
          }
        }).then(function(links) {
          links.forEach(function(link) {
            var currentLink = {};
            currentLink.title = link.title;
            currentLink.url = link.url;
            currentLink.votes = 0;
            
            LinkVote.findAll({ // find all linkVotes of the link
              where: {
                linkId: link.id
              }
            })
            .then(function(linkVotes) {
              var linkVoteTotal = 0;
              linkVotes.forEach(function(linkVote) {
                linkVoteTotal += linkVote.val;
              });

              currentLink.votes = linkVoteTotal;
            });
            currentSection.links.push(currentLink);
          });
        })

        individualGuide.sections.push(currentSection);
      });
    })
    .then(function() {
      GuideVote.findAll({ // find all votes associated with the guide
        where: {
          guideId: guide.id
        }
      })
      .then(function(guideVotes) {
        var guideVoteTotal = 0;

        for (var i = 0; i < guideVotes.length; i++) {
          guideVoteTotal += guideVotes[i].val;
        }

        individualGuide.votes = guideVoteTotal;
      });
    })
    .then(function() {
      // Find category associated with guide.
      // May want to refactor to allow for multiple categories later
      Category.find({ 
        where: {
          id: guide.categoryId
        }
      })
      .then(function(category) {
        if (category) {
          individualGuide.category = category.name;
        } else {
          individualGuide.category = null;
        }
      });
    })
    .then(function() {
      // Find user email associated with the guide
      User.find({
        where: {
          id: guide.userId
        }
      })
      .then(function(user) {
        if (user && user.email) {
          console.log(user.email);
          individualGuide.userEmail = user.email;
        }
      });
    })
    .then(function() {
      // Find all comments associated with the guide
      Comment.findAll({
        where: {
          guideId: guide.id
        }
      })
      .then(function(comments) {
        var currentComment = {};
        
        for (var i = 0; i < comments.length; i++) {
          currentComment.message = comments[i].message;
          // currentComment.userName = comments[i].userName;
          individualGuide.comments.push(currentComment);
        }
      })
      .then(function() {
        console.log("Individual Guide: ", individualGuide);
        res.status(200).json({
          guide: individualGuide
        });
      });
    });
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
  // console.log('createGuide controller POST response');
  var guideContract = {
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
  
  console.log('createGuide controller POST req.body', req.body);
  guideContract = req.body;

  //Save guide data
  Guide.create({ //create guide entry
    title: guideContract.title || "JY's Guide to JS",
    description: guideContract.description || "If JY can JS so can you!",
    userId: guideContract.userId || 1
  })
  .then(function(guide) {
    //create section obj with guide id
    var guideId = guide.get('id');
    guideContract.sections.forEach(function(section){
      Section.create({
        title: section.title,
        description: section.description,
        guideId: guideId
      })
      //create link entry with its section id
      .then(function(newSection){
        var sectionId = newSection.get('id');
        section.links.forEach(function(link){
          Link.create({
            title: link.title || 'Default Link Title',
            url: link.link, // TODO: eventually change this to url on frontend
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
  createGuide: createGuide,
  readIndividualGuide: readIndividualGuide
};

