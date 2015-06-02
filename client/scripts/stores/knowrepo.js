'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var repoConstants = require('../constants/knowledgerepo');
var sectionDefaults = require('../constants/defaults');
var inputConstants = require('../constants/input');

var _curatedGuides = [];
var _favGuides = [];

var KnowledgeStore = new Store({
  //starts the _sections repository with a section and a link
  init: function(){
    //var newSection = cloneObj(sectionDefaults.section);
    //var newLink = cloneObj(sectionDefaults.link);
    //_sections.push(newSection);
    //_sections[0].links.push(newLink);

  },

	// Gets all sections
	//get: function() {
	//	return _curatedGuides;
	//},

  getUserGuides: function(){
    return _curatedGuides;
  },
	getFavGuides: function(){
		return _favGuides;
	}
  
});

KnowledgeStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;
  switch(action.actionType){
    case repoConstants.SET_CURATED:
      _curatedGuides = action.guides;
			KnowledgeStore.emitChange();
      break;
    //case repoConstants.CREATE_GUIDE:
    //  var newSection = cloneObj(sectionDefaults.section);
    //  _sections.push(newSection);
			//KnowledgeStore.emitChange();
    //  break;
    case repoConstants.SET_FAVS:
			_favGuides = action.guides;
			KnowledgeStore.emitChange();
			break;
  //  case inputConstants.UPDATE_INPUT_VALUE:
  //    var index = payload.action.index;
  //    var input = payload.action.input;
  //    var fieldName = payload.action.name;
  //    /*
  //    updates the sections/guide object based on the
  //    field name that was modified in the view
  //    */
  //    switch(fieldName){
  //      case "links":
  //        var linkKey = payload.action.linkidx;
  //        _sections[index][fieldName][linkKey].link = input;
  //        break;
  //      case "guideTitle":
  //      case "guideDescription":
  //        _guide[fieldName] = input;
  //        break;
  //      default:
  //      _sections[index][fieldName] = input;
  //    }
		//	KnowledgeStore.emitChange();
  //    break;
  }

});

module.exports = KnowledgeStore;
