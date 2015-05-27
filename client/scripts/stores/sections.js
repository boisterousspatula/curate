'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var sectionDefaults = require('../constants/defaults');


var CHANGE_EVENT = 'change';
var _sections = [];


var SectionStore = new Store({
  //starts the _sections repository with a section

  init: function(){
    var newSection = JSON.parse(JSON.stringify(sectionDefaults.section));
    var newLink = JSON.parse(JSON.stringify(sectionDefaults.link));
    _sections.push(newSection)
    _sections[0].links.push(newLink)

  },

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

	// Gets all sections
	get: function() {
		return _sections;
	}

  
});

SectionStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;

	if (action.actionType === sectionConstants.SET_SECTIONS) {

		_sections = action.sections;
		SectionStore.emitChange();
	}
  else if(action.actionType === sectionConstants.CREATE_NEW_SECTION){
    //pushes a new section template to object
    console.log("in section store, pushing section")

    var newSection = JSON.parse(JSON.stringify(sectionDefaults.section));

    _sections.push(newSection);
    SectionStore.emitChange();
  }
  else if(action.actionType === sectionConstants.CREATE_NEW_LINK){
    var index = payload.action.index

    console.log("in section store, pushing link at index", index);

    var newLink = JSON.parse(JSON.stringify(sectionDefaults.link));
    _sections[index].links.push(newLink);
    SectionStore.emitChange();

  }

});

module.exports = SectionStore;
