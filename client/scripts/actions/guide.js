'use strict';

var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var assign = require('object-assign');

module.exports = {

  addSection: function(){
    console.log("in guide actions addSection")
    Dispatcher.handleViewAction({
      actionType: sectionConstants.CREATE_NEW_SECTION
    })
  },
  addLink: function(){
    console.log("in guide actions addLink")
    Dispatcher.handleViewAction({
      actionType: sectionConstants.CREATE_NEW_LINK
    })
  }


};
