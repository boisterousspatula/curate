'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');

var ResetComponent = React.createClass({
	render: function() {
		return (
			/* jshint ignore:start */
				<h3>Guide</h3>
				/* jshint ignore:end */
		);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = ResetComponent;
