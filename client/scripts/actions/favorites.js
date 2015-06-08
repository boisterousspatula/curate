'use strict';
var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var request = require('superagent');
var cookie = require('cookie');

module.exports = {

  getToken: function() {
    var cookies = cookie.parse(document.cookie);
    return cookies.token;
  },

  postFavorite: function(guideId, callback) {
    var postUrl = ('/userFavorites');
    var token = this.getToken();
    var guideIdToSend = { guideId: guideId };

    request
      .post(postUrl)
      .set('Content-Type', 'application/json')
      .set({
        'authorization': 'bearer ' + token,
        'X-Requested-With': 'XMLHttpRequest',
        'userId': window.localStorage.userId
      })
      .send(guideIdToSend)
      .end(function(res) {
        if (res.ok) {
          console.log('Favorite Req Sent Correctly.');
          console.log('Response: ', res.userFavorites);
        }
      });
  }
};
