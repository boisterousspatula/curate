'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var SectionList = require('./sectionList.jsx');

var GuideComponent = React.createClass({
	render: function() {
		return (
			/* jshint ignore:start */

				<SectionList> </SectionList>
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
