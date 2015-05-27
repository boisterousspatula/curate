'use strict';

var keyMirror = require('keymirror');

var sectionConstants = keyMirror({

  // Global message types
  SET_SECTIONS: null,
  CREATE_NEW_SECTION: null,
  CREATE_NEW_LINK: null,
	SAVE_GUIDE:null,
	SET_GUIDES:null

});

module.exports = sectionConstants;
