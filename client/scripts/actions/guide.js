'use strict';

var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var guideConstants = require('../constants/guides');
var assign = require('object-assign');
var messagesActions = require('./messages');
var routeActions = require('./routes');
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');

module.exports = {

	addSection: function(){
    //console.log('in guide actions addSection');
    Dispatcher.handleViewAction({
    	actionType: sectionConstants.CREATE_NEW_SECTION
    });
  },
  addLink: function(index){
    //console.log('in guide actions addLink');
    Dispatcher.handleViewAction({
    	actionType: sectionConstants.CREATE_NEW_LINK,
    	index: index
    });
  },
  saveGuide: function(index){
  	Dispatcher.handleViewAction({
  		actionType: sectionConstants.SAVE_GUIDE,
  		index: index
  	});
  },

  setGuides: function(guides) {
  	console.log('in guide action, guides:', guides);
  	Dispatcher.handleViewAction({
  		actionType: sectionConstants.SET_GUIDES,
  		guides: guides
  	});
  },

  passGuideId: function(id) {
  	Dispatcher.handleViewAction({
  		actionType: guideConstants.PASS_ID,
  		id: id
  	});
  },

  setComments: function(comments) {
  	console.log('in comments:', comments);
  	Dispatcher.handleViewAction({
  		actionType: guideConstants.SET_COMMENTS,
  		comments: comments
  	});
  },

	//addComment: function(comment) {
	//	Dispatcher.handleViewAction({
	//		actionType: guideConstants.ADD_COMMENT,
	//		id:
	//	});
	//},
	//saveGuide: function(index){
	//	console.log('in guide actions save guide');
	//	Dispatcher.handleViewAction({
	//		actionType: sectionConstants.SAVE_GUIDE,
	//		index: index
	//	});
	//},
	postGuide: function(sections, guide, callback){
		var self = this;
		var callback = callback || function() {};
		callback.options = {
			successUrl: '/',
			errorUrl: '/createguide'

		};
		var options = callback.options || {};
		var guideToSend = {
			title: guide.guideTitle,
			description: guide.guideDescription,
			sections: sections
		};
		guideToSend = JSON.stringify(guideToSend);
		var postUrl = ('/guide');
		var token = self.getToken();

		request
		.post(postUrl)
		.set('Content-Type', 'application/json')
		.set({
			'authorization': 'Bearer ' + token,
			'X-Requested-With': 'XMLHttpRequest',
			'userId': window.localStorage.userId
		})
		.send(guideToSend)
		.end(function(res) {
				//console.log('guide post response', res);
				if (res.ok) {
					if (callback && callback.success) {
						callback.success(res);
					}
					if (options.successUrl) {
						routeActions.setRoute(options.successUrl);
					}
				}
				else {
					if (callback && callback.error) {
						callback.error(res);
					}
					if (options.errorUrl) {
						routeActions.setRoute(options.errorUrl);
					}
				}
				// Show global messages
				messagesActions.setMessages(res.body);
				if (callback && callback.complete) {
					callback.complete(res);
				}
			});
	},

	getToken: function() {
		var cookies = cookie.parse(document.cookie);

		return cookies.token;
	},

	postForm: function(form, callback) {
		var self = this;
		var postData = serialize(form);
		var postUrl = form.getAttribute('action') || window.location.pathname;
		var token = self.getToken();
		var options = callback.options || {};

		request
		.post(postUrl)
		.type('form')
		.set({
			'authorization': 'Bearer ' + token,
			'X-Requested-With': 'XMLHttpRequest',
			'userId': window.localStorage.userId
		})
		.send(postData)
		.end(function(res) {
			console.log('guide post response', res);
			if (res.ok) {
				var userData;
					// If auth token needs to be stored
					//if (options.setToken) {
					//	// Store token in cookie that expires in a week
					//	self.setToken(res.body.token, 7);
					//}
					//// If user needs to be updated
					//if (options.updateUser) {
					//	userData = res.body.user;
					//	userData.loggedIn = true;
					//
					//	self.setUser(userData);
					//}
					//// If user needs to be destroyed
					//if (options.destroyUser) {
					//	// Log user out
					//	self.logout();
					//}
					if (callback && callback.success) {
						callback.success(res);
					}
					if (options.successUrl) {
						routeActions.setRoute(options.successUrl);
					}
				}
				else {
					if (callback && callback.error) {
						callback.error(res);
					}
					if (options.errorUrl) {
						routeActions.setRoute(options.errorUrl);
					}
				}

				// Show global messages
				messagesActions.setMessages(res.body);
				if (callback && callback.complete) {
					callback.complete(res);
				}
			});
},

createGuide: function(form, callback) {
	var cb = callback || function() {};
	cb.options = {
		successUrl: '/',
		errorUrl: '/createguide'

	};
	this.postForm(form, cb);
},

getGuides: function(idx, callback) {
	var id = idx || null;
	var cb = callback || function() {};
	cb.options = {
		successUrl: '/',
		errorUrl: '/',
		destination:'/guide'
	};
	this.getReq(id, cb);
},

getGuide: function(id, callback){
	var self = this;
	var token = self.getToken();
		// var options = callback.options || {};
		// var cb = callback || function() {};
		// cb.options = {
		// 	successUrl: '/',
		// 	errorUrl: '/',
		// 	destination: '/guide/single'
		// }
		// ;
		var callback = {options: {destination: null}};
		callback.options.destination = '/guide/single';
		console.log('in actions/guide getGuide id:', id);
		this.getReq(id, callback);
	},

	getReq: function(idx, callback){
		var self = this;
		var token = self.getToken();
		var options = callback.options || {};
		var id = idx || '';

		request
		.get(options.destination)
		.set({
			'authorization': 'Bearer ' + token,
			'X-Requested-With': 'XMLHttpRequest',
			'id': id
		})
			//.send(idx)
			.end(function(res) {
				console.log('guide get response', res);
				if (res.ok) {
					var guideData;

					guideData = res.body.guide;
					console.log('RESPONSE GUIDE: ', guideData)

					self.setGuides(guideData);

					if (callback && callback.success) {
						callback.success(res);
					}
					if (options.successUrl) {
						routeActions.setRoute(options.successUrl);
					}
				}
				else {
					if (callback && callback.error) {
						callback.error(res);
					}
					if (options.errorUrl) {
						routeActions.setRoute(options.errorUrl);
					}
				}

				// Show global messages
				messagesActions.setMessages(res.body);
				if (callback && callback.complete) {
					callback.complete(res);
				}
			});
		},

	//getComments:function(idx, callback){
	//	var id = idx || null;
	//	var cb = callback || function() {};
	//	cb.options = {
	//		successUrl: '/',
	//		errorUrl: '/',
	//		destination, '/'
	//	};
	//	this.getReq(id, cb);
	//},

	comment: function(form, callback) {
		var cb = callback || function () {
		};
		cb.options = {
			successUrl: '/readguide',
			errorUrl: '/readguide'

		};
		this.postComments(form, cb);
	},

	postComments:function(form, callback ){
		var self = this;
		var postData = serialize(form);
		console.log("comments post", form);
		var postUrl = form.getAttribute('action') || window.location.pathname;
		var token = self.getToken();
		var options = callback.options || {};
		request
		.post('/comment')
		.type('form')
		.set({
			'authorization': 'Bearer ' + token,
			'X-Requested-With': 'XMLHttpRequest',
			'userId': window.localStorage.userId
		})
		.send(postData)
		.end(function(res) {
			console.log('guide post response', res);
			if (res.ok) {

				if (callback ) {
					callback(res.body.comment);
				}
				if (options.successUrl) {
					routeActions.setRoute(options.successUrl);
				}
			}
			else {
				if (callback) {
					callback.error(res);
				}
				if (options.errorUrl) {
					routeActions.setRoute(options.errorUrl);
				}
			}

				// Show global messages
				messagesActions.setMessages(res.body);
				if (callback && callback.complete) {
					callback.complete(res);
				}
			});
	}


};
