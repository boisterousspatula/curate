'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var guideStore = require('../../stores/guides');
var GuidePreview = require('./guidepreview.jsx');

//Load Material-UI Components
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');

var GuideListComponent = React.createClass({

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

	componentDidMount: function() {
		guideStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		guideStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			guides: guideStore.get()
		});
	},

	getInitialState: function () {
		return {
			guides : guideActions.getGuides()
		};
	},

	render: function() {
		var self = this;
		if (this.state.guides) {
			var guideList = this.state.guides.sort(function (a, b) {
				return b.votes - a.votes;
			}).map(function (guide, idx) {
				guide.votes = guide.votes || 0;
				return (
					/* jshint ignore:start */
					<GuidePreview key={idx} id={guide.id} index={idx} guide={guide} votes={guide.votes}/>
					/* jshint ignore:end */
				);
			});
		}

		return (
			/* jshint ignore:start */
			<div className="container guideList">
				<div className="callToAction">Find a learning path</div>
				<h4>FEATURED GUIDES</h4>
				<table>
					{guideList}
				</table>
			</div>
			/* jshint ignore:end */
		);
	}

});

module.exports = GuideListComponent;
