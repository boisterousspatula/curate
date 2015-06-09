'use strict';

var keyMirror = require('keymirror');

var guideConstants = keyMirror({

  // Global message types
  SET_GUIDES: null,
  PASS_ID: null,
	SET_COMMENTS:null,
	ADD_COMMENT:null,
	SET_USER_CONTENT:null

});

module.exports = guideConstants;
