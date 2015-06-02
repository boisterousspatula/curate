'use strict';

var keyMirror = require('keymirror');

var repoConstants = keyMirror({

  // Global message types
  SET_CURATED: null,
  CREATE_GUIDE: null,
	SET_FAVS:null

});

module.exports = repoConstants;
