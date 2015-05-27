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


	guides: [{
		title:'ze best',
		description: 'this is a long desc...',
		votes: 10
	},
		{
			title:'ze worst',
			description: 'guide on how to determine worth...',
			votes: 1
		}],

	section: {
		title: null,
		description: null,
		links: []
  }

};

module.exports = Defaults;
