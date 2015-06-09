'use strict';

var React = require('react');
var DefaultLayout = require('../../layouts/default.jsx');
var guideActions = require('../../../actions/guide');
//var Guide = require('./guide.jsx');
//var knowRepoStore = require('../../stores/knowrepo');
var guideStore = require('../../../stores/guides');
var mui = require('material-ui');
var	TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var	DropDownMenu = mui.DropDownMenu;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var defaultContentTypes = require('../../../constants/defaults').contentTypes;
var timeRange = require('../../../constants/defaults').timeRange;

var ContentForm = React.createClass({
	//Needed for mui to load theme
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	//Needed for mui to load theme
	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	//Set current theme
	componentWillMount: function() {

	},
	componentDidMount: function() {
		guideStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		guideStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		//this.setState({
		//	guides: knowRepoStore.getUserGuides()
		//})
	},

	getInitialState: function () {
		return {
			timeRanges : timeRange,
			contentTypes : defaultContentTypes
		};
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var form = e.currentTarget;

		guideActions.userContent(form, guideActions.setUserContent, this.props.sectionIndex);

	},

	render: function() {
		console.log('content props', this.props);
		return (
			/* jshint ignore:start */
			<form className="userContentForm" action='/addCrowdLink' onSubmit={this.handleSubmit}>

				<input type="hidden" value={this.props.section} name="sectionId" />
				<TextField hintText="TITLE" name="linkTitle" />

				<TextField hintText="LINK URL" name="url" />
				<RaisedButton type="submit"  label="Submit" secondary={true} value="Post" />
			</form>
			/* jshint ignore:end */
		);
				//<label>Content Type: </label>
				//<DropDownMenu menuItems={this.state.contentTypes} name="contentTypes" />
				//
				//<label>Estimated Time to Completion: </label>
				//<DropDownMenu menuItems={this.state.timeRanges} name="linkDuration" />
	}
});
module.exports = ContentForm;
