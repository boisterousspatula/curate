'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');
var sectionStore = require('../../stores/sections');
//var Section = require('./section.jsx');

var getState = function () {
	return {
		user: userStore.get(),
		sections: sectionStore.get()
	};
};
var SectionListComponent = React.createClass({
	getInitialState: function () {
		return getState();
	},
	render: function () {
		console.log(this.state.sections);
		var sectionList = this.state.sections;

		return (
			/* jshint ignore:start */

			<ul>
				{sectionList}
			</ul>
			/* jshint ignore:end */
		);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = SectionListComponent;
