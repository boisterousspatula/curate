'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var knowRepoStore = require('../../stores/knowrepo');
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
	//		guides: knowRepoStore.getUserGuides()
	//	})
	//},
	//
	//getInitialState: function () {
	//	return {
	//		guides : knowRepoActions.getComments()
	//	};
	//},

	render: function() {
		var commentNodes = this.props.data.map(function(comment, index) {
			return (
				// `key` is a React-specific concept and is not mandatory for the
				// purpose of this tutorial. if you're curious, see more here:
				// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
				/* jshint ignore:start */
				<Comment author={comment.author} key={index}>
					{comment.text}
				</Comment>
				/* jshint ignore:end */
			);
		});
		return (
			/* jshint ignore:start */
			<div className="commentList">
				{commentNodes}
			</div>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentList;
