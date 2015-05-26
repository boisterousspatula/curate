'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');

var getState = function() {
	return {
		user: userStore.get()
	};
};

var SectionComponent = React.createClass({
	getInitialState: function () {
		return getState();
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<p>this.props.user</p>
			/* jshint ignore:end */
		);
	},
			handleSubmit: function(e) {
			e.preventDefault();
			//var form = e.currentTarget;
			//userActions.reset(form);
		}
			});

			module.exports = SectionComponent;
