'use strict';

var keyMirror = require('keymirror');

var guideConstants = keyMirror({

  // Global message types
  SET_GUIDES: null,
  UPVOTE: null,
  DOWNVOTE: null

});

module.exports = guideConstants;
