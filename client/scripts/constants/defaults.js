'use strict';

var Defaults = {

  route: '/',

  page: {
    title: 'Home',
    description: 'A React + Flux application',
    keywords: null

  },

  user: {
    loggedIn: false,
    firstName: 'John',
    lastName: 'Doe'
  },

  messages: {},

	sections: [{
		title:'test title',
		description: 'this is a long desc...',
		links: [
			'google.com', 'facebook.com'
		]
	},
		{
			title:'test 2',
			description: 'this is a long desc...',
			links: [
				'espn.com', 'youtube.com'
			]
		}],

	guides: [{
		title:'ze best',
		description: 'this is a long desc...',
		votes: 10
	},
		{
			title:'ze worst',
			description: 'guide on how to determine worth...',
			votes: 1
		}]


};

module.exports = Defaults;
