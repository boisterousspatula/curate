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
				<div className="container">
					<form className="createGuideContainer" method="post" action="/guide" onSubmit={this.handleSubmit}>
						<span className='guideTitle'>Create new guide</span>
						<div className="guideContentContainer">
							<h4 className='guideHeader'>Guide</h4>
							<div>
								<SectionTextInput className="col" placeholder="Guide Title:"  value={this.state.guide.guideTitle} name="guideTitle"/>
								<SectionTextInput className="col" placeholder="Guide Description:" name="guideDescription" id="guideDescription"/>
							</div>
							<div>
							<h4 className='sectionHeader'>Section</h4>
							<SectionList sections={this.state.sections}/>
								</div>
							<div className="row">
								<button className="btn waves-effect waves-light green padding" onClick={this.handleNewSection}>
									<i className="mdi-content-add right"></i>
									Add new section
								</button>
							</div>
							<div className="row">
								<button className="btn waves-effect waves-light green" type="submit">
									<i className="mdi-content-create right"></i>
									Publish New Guide
								</button>
							</div>
						</div>
					</form>
				</div>
			</DefaultLayout>
			/* jshint ignore:end */
		);
		//<button className="btn waves-effect waves-light green" onTouchTap={this._showKnowledgeRepoBar}>
		//	<i className="mdi-file-cloud-circle right"></i>
		//	Show Knowledge Repo
		//</button>
		//<KnowledgeRepoBar
		//	ref="knowledgeRepoBar"
		//	docked={false}/>

	},

	//_showKnowledgeRepoBar: function() {
	//	this.refs.knowledgeRepoBar.toggle();
	//},

	handleSubmit: function(e) {
		e.preventDefault();
		//console.log('in handle submit view', e.currentTarget);
		var form = e.currentTarget;

		this.setState({
			sections: sectionStore.get(),
			guide: sectionStore.getGuide().guide
		});
		guideActions.postGuide(this.state.sections, this.state.guide);
	},
	handleNewSection: function(e){
		e.preventDefault();
		guideActions.addSection();
	}
});

module.exports = GuideComponent;
