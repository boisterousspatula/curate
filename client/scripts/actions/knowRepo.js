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

	setCurated: function(guides) {

		Dispatcher.handleViewAction({
			actionType: sectionConstants.SET_CURATED,
			guides: guides
		});
	},

	setFavs: function(guides) {
		//console.log('in set favs', guides);
		Dispatcher.handleViewAction({
			actionType: sectionConstants.SET_FAVS,
			guides: guides
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

	getFavsForKnowRepoBar: function(idx, callback) {
		var id = idx || null;
		var cb = callback || function() {};
		cb.options = {
		};
		this.getReq(id, cb);
	},

	getReq: function(idx, callback){
		var self = this;
		var token = self.getToken();
		var options = callback.options || {};

		request
			.get('/userFavorites')
			.set({
				'authorization': 'Bearer ' + token,
				'X-Requested-With': 'XMLHttpRequest',
				'userId': window.localStorage.userId
			})
			.end(function(res) {
				if (res.ok) {
					var guideData;

					guideData = res.body.userFavorites;
					self.setFavs(guideData[0]);

					if (options.successUrl) {
						routeActions.setRoute(options.successUrl);
					}
				}
			});
		request
			.get('/guide/user')
			.set({
				'authorization': 'Bearer ' + token,
				'X-Requested-With': 'XMLHttpRequest',
				'userId': window.localStorage.userId
			})
			//.send(idx)
			.end(function(res) {
				if (res.ok) {
					var guideData;

					guideData = res.body.guide;
					self.setCurated(guideData);

					if (options.successUrl) {
						routeActions.setRoute(options.successUrl);
					}
				}
				else {
					if (options.errorUrl) {
						routeActions.setRoute(options.errorUrl);
					}
				}
			});
	}


};
