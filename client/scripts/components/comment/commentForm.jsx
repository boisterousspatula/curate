'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var knowRepoStore = require('../../stores/knowrepo');

var CommentList = React.createClass({
	componentDidMount: function() {
		knowRepoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		knowRepoStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			guides: knowRepoStore.getUserGuides()
		})
	},

	getInitialState: function () {
		return {
			guides : knowRepoActions.getHome()
		};
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		//React.findDOMNode(this.refs.author).value = '';
		//React.findDOMNode(this.refs.text).value = '';
	},

	render: function() {

		return (
			/* jshint ignore:start */
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" ref="author" />
				<input type="text" placeholder="Say something..." ref="text" />
				<input type="submit" value="Post" />
			</form>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentList;
