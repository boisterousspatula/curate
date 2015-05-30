'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var sectionDefaults = require('../constants/defaults');
var inputConstants = require('../constants/input');

var _sections = [];

var cloneObj = function(obj){
  //returns a new copy of the object, used whenever we need to push a copy of a data structure into _sections
  return JSON.parse(JSON.stringify(obj));
};

var SectionStore = new Store({
  //starts the _sections repository with a section and a link
  init: function(){
    var newSection = cloneObj(sectionDefaults.section);
    var newLink = cloneObj(sectionDefaults.link);
    _sections.push(newSection);
    _sections[0].links.push(newLink);

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
    console.log('in section store, pushing section');

    //adds a new section to _sections
    var newSection = cloneObj(sectionDefaults.section);
    _sections.push(newSection);
    SectionStore.emitChange();
  }
  else if(action.actionType === sectionConstants.CREATE_NEW_LINK){
    console.log('in section store, pushing link at index');
    //adds a new link to _sections at the index of the section that the add button was clicked
    var index = payload.action.index;
    var newLink = cloneObj(sectionDefaults.link);
    _sections[index].links.push(newLink);
    SectionStore.emitChange();
  }
  else if(action.actionType === inputConstants.UPDATE_INPUT_VALUE){
    console.log("in section store, updating form input val");

    var index = payload.action.index;
    var val = payload.action.input;
    var nameProp = payload.action.name;

    if(nameProp === "links"){

      var keyProp = payload.action.linkidx
      _sections[index][nameProp][keyProp].link = val;
      console.log("SECTION IS NOW", _sections)
    }else{
      _sections[index][nameProp]= val;
  }

    SectionStore.emitChange();
  }

});

module.exports = SectionStore;
