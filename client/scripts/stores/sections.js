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
    _sections.push(sectionDefaults.section);
    _sections[0].link.push(sectionDefaults.link);
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
    console.log(action.sections);
		_sections = action.sections;

		SectionStore.emitChange();
	}
  else if(action.actionType === sectionConstants.CREATE_NEW_SECTION){
    //pushes a new section template to object
    console.log('in section store, pushing section');
    _sections.push(sectionDefaults.section);
    console.log(_sections);
    SectionStore.emitChange();
  }
  else if(action.actionType === sectionConstants.CREATE_NEW_LINK){
    var index = payload.action.index;


    console.log("in section store, pushing link")
    _sections[index].link.push(sectionDefaults.link);

  }

});

module.exports = SectionStore;
