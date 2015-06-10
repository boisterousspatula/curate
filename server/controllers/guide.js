/**
 * Guide Controller
 */

'use strict';

var db = require('../config/database');
var Guide = db.guide;
var Section = db.section;
var Link = db.link;
var CrowdLink = db.crowdLink;
var User = db.user;
var GuideVote = db.guideVote;
var LinkVote = db.linkVote;
var Comment = db.comment;
var Category = db.category;
var async = require('async');

/**
 * GET /guide
 * Read all guide data
 */
var readGuides = function (req, res, next) {
	// need to find correct guide by id now
	var guidesToSend = [];
	Guide.findAll().then(function(guides) {
		if (!guides) {
			return res.status(400).json({
				errors: [{
					msg: 'Failed to find guides.'
				}]
			});
		}

		async.each(guides, function(guide, next){
				var guideObj = {};
				GuideVote.findAll({ // find all votes associated with the guide
					where: {
						guideId: guide.id
					}
				})
					.then(function(guideVotes){
						var guideVoteTotal = 0;
						for(var i = 0; i < guideVotes.length; i++) {
							guideVoteTotal += guideVotes[i].val;
						}
						guideObj.votes = guideVoteTotal;
						guideObj.id = guide.id;
						guideObj.title = guide.title;
						guideObj.description = guide.description;
						guideObj.createdAt = guide.createdAt;
						guideObj.updatedAt = guide.updatedAt;
						guideObj.categoryId = guide.categoryId;
						guideObj.userId = guide.userId;

						guidesToSend.push(guideObj);
						next();
					})

			}, function(err){
				if (err) {
					console.log('failed to find');
				} else {
					res.status(200).json({
						guide: guidesToSend
					});
				}
			}
		)
	})
		.error(function(err) {
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
			userId: req.headers.userid
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
	var guideId = req.headers.id;

	Guide.find({
		where: {
			id: guideId
		}
		//include: [
		//		{ model: Section, include: {model:Link} }
		//	]
	})
		.then(function(guide) {

			if (!guide) {
				return res.status(400).json({
					errors: [{
						msg: 'Failed to find guide.'
					}]
				});
			}

			individualGuide.title = guide.title;
			individualGuide.description = guide.description;
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
				//,
				//include: [
				//	//{ model: Section },
				//	{ model: Link, },
				//	{ model: Comment, include: {model:user}},
				//]
			})
				.then(function(sections) {

					sections.forEach(function(section) {
						var currentSection = {};
						currentSection.sectionId = section.id;
						currentSection.title = section.title;
						currentSection.description = section.description;
						currentSection.links = [];
						currentSection.crowdLinks = [];

						Link.findAll({ // find all links of the section
							where: {
								sectionId: section.id
							}
						})
							.then(function(links) {
								links.forEach(function(link) {
									var currentLink = {};
									currentLink.linkTitle = link.title;
									currentLink.url = link.url;
									currentLink.votes = link.voteTotal;
									currentLink.linkDescription = link.description;
									currentLink.contentTypes = link.type;
									currentLink.linkDuration =link.duration;
									currentLink.linkId = link.id

									LinkVote.count({where: {
										linkId: link.id
									}
									}).success(function(count){
										currentLink.votes = count;
									})

									currentSection.links.push(currentLink);
								});
							});
						individualGuide.sections.push(currentSection);

					});
				})
				.then(function(sections) {
					individualGuide.sections.forEach(function(section) {
						CrowdLink.findAll({ // Find all crowdLinks of the section
							where: {
								sectionId: section.sectionId
							}
						})
							.then(function(crowdLinks) {
								crowdLinks.forEach(function(crowdLink) {
									var currentCrowdLink = {};
									currentCrowdLink.linkTitle = crowdLink.title;
									currentCrowdLink.url = crowdLink.url;
									currentCrowdLink.votes = crowdLink.voteTotal;
									currentCrowdLink.linkDescription = crowdLink.description;
									currentCrowdLink.contentTypes = crowdLink.type;
									currentCrowdLink.linkDuration =crowdLink.duration;

									//LinkVote.findAll({
									//  where: {
									//    crowdLinkId: crowdLink.id
									//  }
									//})
									//.then(function(crowdLinkVotes) {
									//  var crowdLinkVoteTotal = 0;
									//  crowdLinkVotes.forEach(function(crowdLinkVote) {
									//    crowdLinkVoteTotal += crowdLinkVote.val;
									//  });
									//
									//  currentCrowdLink.votes = crowdLinkVoteTotal;
									//});
									section.crowdLinks.push(currentCrowdLink);
								});
							});
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

							comments.forEach(function(comment) {
								var currentComment = {};
								currentComment.userId = comment.userId;
								currentComment.message = comment.message;
								currentComment.userEmail = 'Poop@gmail.com';

								individualGuide.comments.push(currentComment);
							});
						})
						.then(function(comments) {
							async.each(individualGuide.comments, function(comment, next) {
								User.find({where: {
									id: comment.userId
								}}).then(function(user) {
									comment.userEmail = user.email;
									next();
								});
							}, function(err) {
								if (err) {
									console.log('Failed to find User Emails');
								} else {
									//console.log("Individual Guide: ", individualGuide);
									res.status(200).json({
										guide: individualGuide
									});
								}
							});
						});
				});
		}).error(function(err) {
			if (err) {
				return next(err);
			}
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
						console.log('this is what links look like', section.links);
						section.links.forEach(function(link){
							Link.create({
								title: link.linkTitle,
								url: link.link,
								description: link.linkDescription,
								type: link.contentTypes || 'Course',
								duration: link.linkDuration || '10',
								sectionId: sectionId
								//voteTotal: link.votes || 0
							})
							.error(function(err) {
								if (err) {
									return next(err);
								}
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
