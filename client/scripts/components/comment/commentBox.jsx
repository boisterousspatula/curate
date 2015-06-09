'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideStore = require('../../stores/guides');
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
		var comments = this.props.comments;
		comments.push(comment);
		this.setState({comments: comments}, function() {

		});
	},
	_onChange: function() {
		this.setState({
			comments: guideStore.getCommentsBySection()
		});
	},
	getInitialState: function() {
		return {comments: this.props.comments};
	},
	componentDidMount: function() {
		guideStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		guideStore.removeChangeListener(this._onChange);
	},
	render: function() {
		console.log('comments', this.props.comments);
		return (
			/* jshint ignore:start */
			<div className="commentBox">
				<h5>Comments</h5>
				<CommentForm guideId={this.props.guideId} onCommentSubmit={this.handleCommentSubmit} />
				<CommentList comments={this.props.comments} />
			</div>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentBox;
