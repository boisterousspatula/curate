'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');


var SectionLinkComponent = React.createClass({
	render: function () {
	console.log('links', this.props.link);
		return (
			/* jshint ignore:start */
			<li>
				{this.props.link}
			</li>
			/* jshint ignore:end */
		);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = SectionLinkComponent;
