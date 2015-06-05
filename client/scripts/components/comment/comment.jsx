'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var knowRepoStore = require('../../stores/knowrepo');

var Comment = React.createClass({
	componentDidMount: function() {
		//knowRepoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//knowRepoStore.removeChangeListener(this._onChange);
	},
	//
	//_onChange: function(){
	//	this.setState({
	//		guides: knowRepoStore.getUserGuides()
	//	})
	//},
	//
	getInitialState: function () {
		return {
			comment: this.props.comment
		};
	},

	render: function() {
		console.log('in comment', this.props.comment);
		//var commentNodes = this.props.comments.map(function(comment, index) {
		//	return (
		//		// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
		//		/* jshint ignore:start */
		//		<Comment author={comment.email||'bro'} key={index}>
		//			{comment.message}
		//		</Comment>
		//		/* jshint ignore:end */
		//	);
		//});
		//console.log(this.props);
		return (
			/* jshint ignore:start */
			<div className="comment">
				<h6 className="userEmail">
					{this.props.userEmail}
				</h6>
				{this.props.message}
			</div>

			/* jshint ignore:end */
		);
	}
});
module.exports = Comment;
