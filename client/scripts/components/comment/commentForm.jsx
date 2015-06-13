'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var mui = require('material-ui');
var	TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');

var CommentForm = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	//Needed for mui to load theme
	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},
	componentDidMount: function() {
		//knowRepoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//knowRepoStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			//guides: knowRepoStore.getUserGuides()
		})
	},

	getInitialState: function () {

		return {
			//guides : knowRepoActions.getHome()
		};
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var form = e.currentTarget;

		guideActions.comment(form, guideActions.setComments);
		form.reset();
	},

	render: function() {
		return (
			/* jshint ignore:start */
			<form className="commentForm" action='/comment' onSubmit={this.handleSubmit}>

				<input type="hidden" value={this.props.guideId} name="guideId" />
				<TextField type="text" placeholder="Your comment here. Be cool." name="message" />
				<RaisedButton type="submit" label="Submit" secondary={true} value="Post" />
			</form>
			/* jshint ignore:end */
		);
	}
});
module.exports = CommentForm;
