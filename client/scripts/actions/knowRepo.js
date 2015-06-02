'use strict';

var Dispatcher = require('../dispatchers/default');
var sectionConstants = require('../constants/knowledgerepo');
var assign = require('object-assign');
var messagesActions = require('./messages');
var routeActions = require('./routes');
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');

module.exports = {

	//saveGuide: function(index){
	//	Dispatcher.handleViewAction({
	//		actionType: sectionConstants.SAVE_GUIDE,
	//		index: index
	//	});
	//},

	setCurated: function(guides) {

		Dispatcher.handleViewAction({
			actionType: sectionConstants.SET_CURATED,
			guides: guides
		});

		Dispatcher.handleViewAction({
			actionType: sectionConstants.SET_FAVS,
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
			title: guide.title,
			description: guide.description,
			sections: sections
		}
		guideToSend = JSON.stringify(guideToSend);
		var postUrl = ('/guide')
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


	getHome: function(idx, callback) {
		var id = idx || null;
		var cb = callback || function() {};
		cb.options = {
			successUrl: '/knowrepo',
			errorUrl: '/knowrepo'
		};
		this.getReq(id, cb);
	},

	//getCurated: function(idx, callback) {
	//	var id = idx || null;
	//	var cb = callback || function() {};
	//	cb.options = {
	//		successUrl: '/knowrepo',
	//		errorUrl: '/knowrepo'
	//	};
	//	this.getReq(id, cb);
	//},

	getReq: function(idx, callback){
		var self = this;
		var token = self.getToken();
		var options = callback.options || {};

		request
			// TODO: change to guide/user and get the id somehow.
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
					self.setCurated(guideData);

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
