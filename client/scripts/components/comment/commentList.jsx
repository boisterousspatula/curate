'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var guideStore = require('../../stores/guides');
var Comment = require('./comment.jsx');

var CommentList = React.createClass({
	//componentDidMount: function() {
	//	knowRepoStore.addChangeListener(this._onChange);
	//},
	//
	//componentWillUnmount: function() {
	//	knowRepoStore.removeChangeListener(this._onChange);
	//},
	//
	//_onChange: function(){
	//	this.setState({
	//		comments: guideStore.getCommentsBySection()
	//	})
	//},
	//
	//getInitialState: function () {
	//	return {
	//		guides : knowRepoActions.getComments()
	//	};
	//},

	render: function() {
		var commentNodes = this.props.comments.map(function(comment, index) {
			return (
				/* jshint ignore:start */
				<Comment userEmail={comment.userEmail} key={index} message={comment.message}/>
				/* jshint ignore:end */
			);
		});
		return (
			/* jshint ignore:start */
			<div className="collection">
				{commentNodes}
			</div>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentList;
