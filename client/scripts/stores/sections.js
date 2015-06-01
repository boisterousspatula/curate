'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var sectionDefaults = require('../constants/defaults');
var inputConstants = require('../constants/input');

var _sections = [];
var _guide = sectionDefaults.guide;

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
	},

  getGuide: function(){
    return _guide;
  },
  
});

SectionStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;
  switch(action.actionType){
    case sectionConstants.SET_SECTION:
      _sections = action.sections;
      SectionStore.emitChange();
      break;
    case sectionConstants.CREATE_NEW_SECTION:
      var newSection = cloneObj(sectionDefaults.section);
      _sections.push(newSection);
      SectionStore.emitChange();
      break;
    case sectionConstants.CREATE_NEW_LINK:
      var index = payload.action.index;
      var newLink = cloneObj(sectionDefaults.link);
      _sections[index].links.push(newLink);
      SectionStore.emitChange();
      break;
    case inputConstants.UPDATE_INPUT_VALUE:
      var index = payload.action.index;
      var input = payload.action.input;
      var fieldName = payload.action.name;
      /*
      updates the sections/guide object based on the 
      field name that was modified in the view
      */
      switch(fieldName){
        case "links":
          var linkKey = payload.action.linkidx
          _sections[index][fieldName][linkKey].link = input;
          break;
        case "guideTitle":
        case "guideDescription":
          _guide[fieldName] = input;
          break;
        default:
        _sections[index][fieldName] = input;
      }
      SectionStore.emitChange();
      break;
  };

});

module.exports = SectionStore;
