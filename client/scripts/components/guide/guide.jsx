'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var SectionList = require('./sectionList.jsx');
var sectionStore = require('../../stores/sections');

var GuideComponent = React.createClass({
	getInitialState: function () {
		return {
			sections : sectionStore.get()
		};
	},
	render: function() {
		return (
			/* jshint ignore:start */
				<SectionList sections={this.state.sections}/>
				/* jshint ignore:end */
		);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = GuideComponent;
