'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var guideConstants = require('../constants/guides');
var inputConstants = require('../constants/input');
var guideDefaults = require('../constants/defaults').guides;

var _guides;
var _guideId;

var GuideStore = new Store({

	// Gets data associated with the current messages.
	get: function() {
		return _guides || guideDefaults;
	},
	getLinkVotes: function(linkIndex, sectionIndex){
		return _guides.sections[sectionIndex].links[linkIndex].votes;
	},
	getGuideVotes: function(index){
		return index ? _guides[index].votes : _guides.votes;
	},
	getId: function() {
		return _guideId;
	},
	getCommentsBySection: function() {
		return _guides.comments;
	}

});

GuideStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;

	switch(action.actionType){
		case guideConstants.SET_GUIDES:
			_guides = action.guides;
			GuideStore.emitChange();
			break;
		case inputConstants.UPVOTE_GUIDE:
			var index = action.index

			index === undefined ? ++_guides.votes : ++_guides[index].votes;

			GuideStore.emitChange();
			break;
		case inputConstants.DOWNVOTE_GUIDE:
			var index = action.index

			index === undefined ? --_guides.votes : --_guides[index].votes;

			GuideStore.emitChange();
			break;
		case inputConstants.UPVOTE_LINK:
			var linkIndex = action.linkIndex;
			var sectionIndex = action.sectionIndex;
			_guides.sections[sectionIndex].links[linkIndex].votes++;
			GuideStore.emitChange();
			break;
		case inputConstants.DOWNVOTE_LINK:
			var linkIndex = action.linkIndex;
			var sectionIndex = action.sectionIndex;
			_guides.sections[sectionIndex].links[linkIndex].votes--;
			GuideStore.emitChange();
			break;
		case guideConstants.PASS_ID:
			_guideId = payload.action.id;
			GuideStore.emitChange();
			break;
		case guideConstants.SET_COMMENTS:
			_guides.comments.push(action.comments);
			GuideStore.emitChange();
			break;
		case guideConstants.ADD_COMMENT:
			_guides.comments = action.comments;
			GuideStore.emitChange();
			break;
		case guideConstants.SET_USER_CONTENT:
			var sectionIndex = action.sectionIdx;
			_guides.sections[sectionIndex].crowdLinks.push(action.userContent);
			GuideStore.emitChange();
			break;
	}
	

});

module.exports = GuideStore;
