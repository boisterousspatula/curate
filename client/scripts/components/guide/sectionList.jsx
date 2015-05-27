'use strict';

var React = require('react');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');
var sectionStore = require('../../stores/sections');
var Section = require('./section.jsx');
var guideActions = require('../../actions/guide');


var SectionListComponent = React.createClass({
	
	render: function () {
		var sectionList = this.props.sections;
		var htmlSections = sectionList.map(function(sec,idx){
			/* jshint ignore:start */
			return (
				<Section key={idx} sec={sec}/>
			);
			/* jshint ignore:end */
		});
		return (
			/* jshint ignore:start */
			<div>
				<ul>
					{htmlSections}
				</ul>
				<button onClick={this.handleNewSection}>Add new section</button>
			</div>

			
			/* jshint ignore:end */
		);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	},

	handleNewSection: function(e){
		e.preventDefault();
		console.log("in handleNewSection func");		
		guideActions.addSection();
		
	}
});

module.exports = SectionListComponent;
