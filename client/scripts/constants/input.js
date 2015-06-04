'use strict';

var keyMirror = require('keymirror');

var inputConstants = keyMirror({

  // Global message types
  UPDATE_INPUT_VALUE: null,
  UPVOTE_LINK: null,
  DOWNVOTE_LINK: null,
  UPVOTE_GUIDE: null,
  DOWNVOTE_GUIDE: null

});

module.exports = inputConstants;
