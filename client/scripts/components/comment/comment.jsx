'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
var knowRepoStore = require('../../stores/knowrepo');


var Comment = React.createClass({

	getInitialState: function () {
		return {
			comment: this.props.comment
		};
	},

	render: function() {
		return (
			/* jshint ignore:start */
			<li className="collection-item avatar">
				<i className="mdi-action-account-circle"></i>
				<span className="title">
					{this.props.userEmail}
				</span>
				<p>{this.props.message}</p>
			</li>
			/* jshint ignore:end */
		);
	}
});
module.exports = Comment;
