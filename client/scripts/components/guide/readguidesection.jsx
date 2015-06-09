'use strict';

var React = require('react');
var Vote= require('./readguidevote.jsx');
var inputActions = require('../../actions/input');
var mui = require('material-ui');
var	Paper = mui.Paper;
var	Dialog = mui.Dialog;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
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
	render: function() {
		var section = this.props.sec;
		//console.log('links', section.links);
		var self = this;
		var linkList = section.links.map(function(link, idx){
			/* jshint ignore:start */
			return(
				<div key={idx}>
					<Paper zDepth={1}>
						<Vote votes={link.votes} type="link" linkId ={link.linkId} linkIndex={idx} sectionIndex={self.props.index} guideId ={self.props.guideId}/>
						<p>{link.linkTitle}</p>
						<p>{link.url}</p>
						<p>{link.linkDescription}</p>
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
						<Vote votes={link.votes} type="link" linkIndex={idx} sectionIndex={self.props.index} />
						<p>{link.linkTitle}</p>
						<p>{link.url}</p>
						<p>{link.linkDescription}</p>
						<p>{link.contentTypes}</p>
						<p>{link.linkDuration}</p>
					</Paper>
				</div>
			);
			/* jshint ingnore:end */
		});

		//var userContentModal = //Standard Actions
		var standardActions = [
			{ text: 'Cancel' },
			{ text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
		];

		//var dialog =
		//	/* jshint ignore:start */
		//	(<Dialog
		//	title="Dialog With Standard Actions"
		//	actions={standardActions}
		//	actionFocus="submit"
		//	modal={this.state.modal}>
		//	The actions in this window are created from the json that's passed in.
		//</Dialog>);
		///* jshint ignore:end */
		return (
			/* jshint ignore:start */
			<div>
				<h5>{section.title}</h5>
				<h6>{section.description}</h6>

				{linkList}

				<h5>USER SUGGESTED CONTENT</h5>
				<hr/>
				<div>
					{crowdSourcedLinks}
				</div>
				<h4>
					Is this the freshest content on the interwebz?
				</h4>
			</div>
			/* jshint ignore:end */
		);
	}

					//<SectionTextInput placeholder='Suggest your own content here...' index={this.props.index} />

});

module.exports = ReadGuideSectionComponent;
