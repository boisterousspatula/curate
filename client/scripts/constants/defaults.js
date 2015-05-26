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
	}]


};

module.exports = Defaults;
