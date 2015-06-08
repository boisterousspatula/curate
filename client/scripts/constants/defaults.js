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
		linkTitle :null,
		link:null,
		votes :null,
		linkDescription:null,
		contentTypes:null,
		linkDuration: null
  },

	contentTypes : [
		{ payload: 'Course', text: 'Course' },
		{ payload: 'Blog', text: 'Blog' },
		{ payload: 'Demo', text: 'Demo' },
		{ payload: 'Video', text: 'Video' }
	],

	timeRange : [
		{ payload: '10', text: '10 Minutes' },
		{ payload: '30', text: '30 Minutes' },
		{ payload: '60', text: '1 Hour' 		},
		{ payload: '90', text: '1.5 Hours' },
		{ payload: '120', text: '2 Hours' 	},
		{ payload: '150', text: '2.5 Hours' },
		{ payload: '300', text: '5 Hours' 	},
		{ payload: '600', text: '10 Hours'	 }

	]
  

};

module.exports = Defaults;
