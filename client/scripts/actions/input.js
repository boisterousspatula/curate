'use strict';

var Dispatcher = require('../dispatchers/default');
var inputConstants = require('../constants/input');

module.exports = {

  setMessages: function(input, name) {
    Dispatcher.handleViewAction({
      actionType: inputConstants.UPDATE_INPUT_VALUE,
      input: input,
      name: name
    });
  }

};
