'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var guideConstants = require('../constants/guides');
var guideDefaults = require('../constants/defaults').guides;

var _guides;

var GuideStore = new Store({

	// Gets data associated with the current messages.
	get: function() {
		return _guides || guideDefaults;
	},
	getVotes: function(linkIndex, sectionIndex){
		return _guides[sectionIndex][links][linkIndex][votes];
	}

});

GuideStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;

	if (action.actionType === guideConstants.SET_GUIDES) {
		//console.log('in guide store set guides');
		_guides = action.guides;
		//console.log(_guides);
		GuideStore.emitChange();
	}
	else if (action.actionType === guideConstants.UPVOTE){
		console.log('upboats')
		var index = action.index;
		_guides[sectionIndex][links][linkIndex][votes]++;
		console.log(_guides[sectionIndex][links][linkIndex][votes])
		GuideStore.emitChange();
	}
	else if (action.actionType === guideConstants.DOWNVOTE){
		console.log('downboats')
		var linkIndex = action.linkIndex;
		var sectionIndex = action.sectionIndex;

		_guides[sectionIndex][links][linkIndex][votes]--;
		GuideStore.emitChange();
	}
	

});

module.exports = GuideStore;
