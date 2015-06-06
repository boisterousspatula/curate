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

  guide: {
		guideTitle: null,
		guideDescription: null
  },

	section: {
		title: null,
		description: null,
		links: []
  },

  link: {
    title: null,
    link: null
  },

	contentTypes : [
		{ payload: '1', text: 'Course' },
		{ payload: '2', text: 'Blog' },
		{ payload: '3', text: 'Demo' },
		{ payload: '4', text: 'Video' }
	],

	timeRange : [
		{ payload: '1', text: '10 Minutes' },
		{ payload: '2', text: '30 Minutes' },
		{ payload: '3', text: '1 Hour' },
		{ payload: '4', text: '1.5 Hours' },
		{ payload: '5', text: '2 Hours' },
		{ payload: '6', text: '2.5 Hours' },
		{ payload: '7', text: '5 Hours' },
		{ payload: '8', text: '10 Hours' }

	]
  

};

module.exports = Defaults;
