'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var SectionList = require('./sectionList.jsx');
var sectionStore = require('../../stores/sections');
var SectionTextInput = require('./sectionTextInput.jsx');

//Load Material-UI Components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var AppLeftNav = require('../modules/appLeftNav.jsx');
var MenuItem = mui.MenuItem;
var Navbar = require('../modules/navbar.jsx');
var RaisedButton = mui.RaisedButton;
var KnowledgeRepoBar = require('../modules/knowledgeRepoBar.jsx');

var GuideComponent = React.createClass({

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

	getInitialState: function () {
		sectionStore.init();
		return {
			sections: sectionStore.get(),
			guide: sectionStore.getGuide()
		};
	},

	//Next 3 properties update state of the view based on the store
	componentDidMount: function() {
		sectionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		sectionStore.removeChangeListener(this._onChange);
	},

	//Update view based on state of section store
	_onChange: function(){
		this.setState({
			sections: sectionStore.get()
		});
	},

	render: function() {
		return (
			/* jshint ignore:start */
			<DefaultLayout>
				<div>
					<form method="post" action="/guide" onSubmit={this.handleSubmit}>
						<div className="guide-headers">
							<h3>Create New Guide! </h3>
							<div className="row">
								<SectionTextInput placeholder="Guide Title:"  value={this.state.guide.guideTitle} name="guideTitle"/>
							</div>
							<br/>
							<div className="row">
								<SectionTextInput placeholder="Guide Description:" isMultiLine={true} name="guideDescription"/>
							</div>
						</div>
						<br/>
						<div className="row">
							<SectionList sections={this.state.sections}/>
						</div>
						<br/>
						<button className="btn waves-effect waves-light red" type="submit" label="Submit" name="save"></button>
					</form>
					<button className="btn waves-effect waves-light red" label="Show Knowledge Repo" onTouchTap={this._showKnowledgeRepoBar}></button>
					<KnowledgeRepoBar
						ref="knowledgeRepoBar"
						docked={false}/>
				</div>
			</DefaultLayout>
			/* jshint ignore:end */
		);

	},

	_showKnowledgeRepoBar: function() {
		this.refs.knowledgeRepoBar.toggle();
	},

	handleSubmit: function(e) {
		e.preventDefault();
		//console.log('in handle submit view', e.currentTarget);
		var form = e.currentTarget;

		this.setState({
			sections: sectionStore.get(),
			guide: sectionStore.getGuide().guide
		});
		guideActions.postGuide(this.state.sections, this.state.guide);
	}
});

module.exports = GuideComponent;
