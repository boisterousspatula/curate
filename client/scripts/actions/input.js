'use strict';

var Dispatcher = require('../dispatchers/default');
var inputConstants = require('../constants/input');

module.exports = {

  updateValue: function(input, name, index) {

    Dispatcher.handleViewAction({
      actionType: inputConstants.UPDATE_INPUT_VALUE,
      input: input,
      name: name,
      index: index
    });
  }

};
