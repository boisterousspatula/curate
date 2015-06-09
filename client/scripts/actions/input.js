'use strict';

var Dispatcher = require('../dispatchers/default');
var inputConstants = require('../constants/input');
var assign = require('object-assign');
var messagesActions = require('./messages');
var request = require('superagent');
var cookie = require('cookie');

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

  upvoteLink: function(linkidx, sectionidx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.UPVOTE_LINK,
      linkIndex: linkidx,
      sectionIndex: sectionidx
    });
  },
  downvoteLink: function(linkidx, sectionidx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.DOWNVOTE_LINK,
      linkIndex: linkidx,
      sectionIndex: sectionidx
    });
  },

  upvoteGuide: function(idx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.UPVOTE_GUIDE,
      index: idx
    });
  },
  downvoteGuide: function(idx){
    Dispatcher.handleViewAction({
      actionType: inputConstants.DOWNVOTE_GUIDE,
      index: idx
    });
  },

  getToken: function() {
    var cookies = cookie.parse(document.cookie);

    return cookies.token;
  },


  postGuideVote: function(guideid, typeOfVote, index){
    var self = this;
    var postUrl = '/guideVote'
    var val;
    if(typeOfVote === 'downvote'){
      val = -1;
    } else if (typeOfVote === 'upvote'){
      val = 1;
    }

    var postData= {
      'userId': window.localStorage.userId,
      'guideId': guideid,
      'val': val
    }

    var token = self.getToken();
    request
    .post(postUrl)
    .set({
      'authorization': 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest',
    })
    .send(postData)
    .end(function(res) {
      if (res.ok) {

        switch(typeOfVote){
          case "upvote":
          self.upvoteGuide(index);
          break;
          case "downvote":
          self.downvoteGuide(index);
          break;
        }
      }
    });
  },

  postLinkVote: function(typeOfVote, linkId, guideId, linkIndex, sectionIndex){
    var self = this;
    var postUrl = '/linkVote'
    var val;
    if(typeOfVote === 'downvote'){
      val = -1;
    } else if (typeOfVote === 'upvote'){
      val = 1;
    }

    var postData= {
      'userId': window.localStorage.userId,
      'guideId': guideId,
      'linkId': linkId,
      'val': val
    }

    var token = self.getToken();
    request
    .post(postUrl)
    .set({
      'authorization': 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest',
    })
    .send(postData)
    .end(function(res) {
      if (res.ok) {

        switch(typeOfVote){
          case "upvote":
          self.upvoteGuide(index);
          break;
          case "downvote":
          self.downvoteGuide(index);
          break;
        }
      }
    });
  }

};
