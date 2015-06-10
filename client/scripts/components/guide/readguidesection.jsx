'use strict';

var React = require('react');
var Vote= require('./readguidevote.jsx');
var inputActions = require('../../actions/input');
var mui = require('material-ui');
var	Paper = mui.Paper;
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var UserContentForm = require('./userContent/userContentForm.jsx');
//var SectionTextInput = require('./sectionTextInput.jsx');


var ReadGuideSectionComponent = React.createClass({
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
		//ThemeManager.setPalette({
		//	accent1Color: Colors.deepOrange500
		//});
	},
	getInitialState: function(){
		return { showContentForm : false }
	},
	render: function() {
		var section = this.props.sec;
		var self = this;
		var linkList = section.links.map(function(link, idx){
			/* jshint ignore:start */
			return(
				<div key={idx}>
					<Paper zDepth={1}>
						<Vote votes={link.votes} type="link" linkId ={link.linkId} linkIndex={idx} sectionIndex={self.props.index} guideId ={self.props.guideId}/>
						<span class='linkTitle'>{link.linkTitle}</span>
						<p>{link.url}</p>
						<span class='linkDesc'>{link.linkDescription}</span>
						<p>{link.contentTypes}</p>
						<p>{link.linkDuration}</p>
					</Paper>
				</div>
			)
		});
		var crowdSourcedLinks = section.crowdLinks.map(function(link, idx){
			/* jshint ignore:start */
			return(
				<div key={idx}>
					<Paper zDepth={1}>
						<Vote className ="vote" votes={link.votes} type="link" linkIndex={idx} sectionIndex={self.props.index} />
						<span class='linkTitle'>{link.linkTitle}</span>
						<span class=''>{link.url}</p>
						<span class='linkDesc'>{link.linkDescription}</span>
					</Paper>
				</div>
			);
			/* jshint ingnore:end */
						//<p>{link.contentTypes}</p>
						//<p>{link.linkDuration}</p>
		});

		return (
			/* jshint ignore:start */
			<div>
				<div className='sectionHeader'>{section.title}</div>
				<div className='sectionDesc'>{section.description}</div>

				{linkList}

				<div className='userSugHeader'>USER SUGGESTED CONTENT</div>
				<hr/>
				<div>
					{crowdSourcedLinks}
				</div>
				<h4>
					Is this the freshest content on the Interwebz?
				</h4>
				<RaisedButton label="Suggest your own content here..." primary={true} onClick={this.toggleMenu}/>

				{this.state.showContentForm ? <UserContentForm className="userContent" section={section.sectionId} sectionIndex={self.props.index} onContentSubmit={this.handleContentSubmit} /> : null}
			</div>
			/* jshint ignore:end */
		);
	},
	toggleMenu: function() {
		// since we put `ref="nav"` on the LeftNav, we can get to it
		// via `this.refs.nav`
		//this.refs.nav.toggle();
		var currentState = this.state.showContentForm;
		this.setState({ showContentForm: !currentState });
	},

	handleContentSubmit: function(content) {
		//var userContent = this.props.sec.crowdLinks;
		//userContent.push(content);
		// not sure if I should add the state because state is on parent component.
		//this.setState({comments: comments}, function() {
		//
		//});
	},
					//<SectionTextInput placeholder='Suggest your own content here...' index={this.props.index} />
});

module.exports = ReadGuideSectionComponent;
