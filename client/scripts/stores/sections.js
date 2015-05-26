'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var sectionDefaults = require('../constants/defaults').sections;

var _sections;

var SectionStore = new Store({

	// Gets data associated with the current messages.
	get: function() {
		return _sections || sectionDefaults;
	}

});

SectionStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;

	if (action.actionType === sectionConstants.SET_SECTIONS) {
		_sections = action.sections;

		SectionStore.emitChange();
	}

});

module.exports = SectionStore;
