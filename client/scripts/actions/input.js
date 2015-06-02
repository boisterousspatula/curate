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

  vote: function(type, linkidx, sectionidx){
    type = type.toUpperCase();
    Dispatcher.handleViewAction({
      actionType: inputConstants[type],
      linkIndex: linkidx,
      sectionIndex: sectionidx
    });
  }

};
