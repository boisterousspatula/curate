'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var knowRepoStore = require('../../stores/knowrepo');
var CommentList = require('./commentList.jsx');
var CommentForm = require('./commentForm.jsx');


var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		// get the comments using the prop from parent.
		//$.ajax({
		//	url: this.props.url,
		//	dataType: 'json',
		//	cache: false,
		//	success: function(data) {
		//		this.setState({data: data});
		//	}.bind(this),
		//	error: function(xhr, status, err) {
		//		console.error(this.props.url, status, err.toString());
		//	}.bind(this)
		//});
	},
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comments.push(comment);
		this.setState({data: comments}, function() {
			// `setState` accepts a callback. To avoid (improbable) race condition,
			// `we'll send the ajax request right after we optimistically set the new
			// `state.
			//$.ajax({
			//	url: this.props.url,
			//	dataType: 'json',
			//	type: 'POST',
			//	data: comment,
			//	success: function(data) {
			//		this.setState({data: data});
			//	}.bind(this),
			//	error: function(xhr, status, err) {
			//		console.error(this.props.url, status, err.toString());
			//	}.bind(this)
			//});
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {

	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="commentBox">
				<h5>Comments</h5>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentBox;
