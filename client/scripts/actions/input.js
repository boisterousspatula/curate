'use strict';

var Dispatcher = require('../dispatchers/default');
var inputConstants = require('../constants/input');

module.exports = {

  updateValue: function(input, name, index, key) {

    Dispatcher.handleViewAction({
      actionType: inputConstants.UPDATE_INPUT_VALUE,
      input: input,
      name: name,
      index: index,
      linkidx: key
    });
  },

  upvoteLink: function(linkidx, sectionidx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.UPVOTE_LINK,
      linkIndex: linkidx,
      sectionIndex: sectionidx
    });
  },
  downvoteLink: function(linkidx, sectionidx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.DOWNVOTE_LINK,
      linkIndex: linkidx,
      sectionIndex: sectionidx
    });
  },

  upvoteGuide: function(idx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.UPVOTE_GUIDE,
      index: idx
    });
  },
  downvoteGuide: function(idx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.DOWNVOTE_GUIDE,
      index: idx
    });
  }

};
