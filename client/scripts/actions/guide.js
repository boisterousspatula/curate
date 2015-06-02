'use strict';

var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/sections');
var assign = require('object-assign');
var messagesActions = require('./messages');
var routeActions = require('./routes');
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');

module.exports = {

  addSection: function(){
    console.log('in guide actions addSection');
    Dispatcher.handleViewAction({
      actionType: sectionConstants.CREATE_NEW_SECTION
    });
  },
  addLink: function(index){
    console.log('in guide actions addLink');
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

		Dispatcher.handleViewAction({
			actionType: sectionConstants.SET_GUIDES,
			guides: guides
		});
	},
	//saveGuide: function(index){
	//	console.log('in guide actions save guide');
	//	Dispatcher.handleViewAction({
	//		actionType: sectionConstants.SAVE_GUIDE,
	//		index: index
	//	});
	//},
	postGuide: function(sections, guide, callback){
		var self= this;
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
		}
		guideToSend = JSON.stringify(guideToSend);
		var postUrl = ('/guide');
		var token = self.getToken();

		request
			.post(postUrl)
			.set('Content-Type', 'application/json')
			.set({
				'authorization': 'Bearer ' + token,
				'X-Requested-With': 'XMLHttpRequest'
			})
			.send(guideToSend)
			.end(function(res) {
				console.log('guide post response', res);
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
				'X-Requested-With': 'XMLHttpRequest'
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
		console.log('in guide save', form);
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
			errorUrl: '/'
		};
		this.getReq(id, cb);
	},

	getReq: function(idx, callback){
		var self = this;
		var token = self.getToken();
		var options = callback.options || {};

		request
			.get('/guide')
			.set({
				'authorization': 'Bearer ' + token,
				'X-Requested-With': 'XMLHttpRequest'
			})
			//.send(idx)
			.end(function(res) {
				console.log('guide get response', res);
				if (res.ok) {
					var guideData;


					guideData = res.body.guide;
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
	}


};
