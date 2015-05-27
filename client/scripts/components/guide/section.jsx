'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var SectionLinkList = require('./sectionLinkList.jsx');
var SectionTextInput = require('./sectionTextInput.jsx')

var SectionComponent = React.createClass({

	render: function() {
		return (
			/* jshint ignore:start */
		<div>
			<ul>
				<li>
				<label>Title: </label>
				<SectionTextInput name="title"/>
				</li>

				<li>
				<label>Description: </label>
				<SectionTextInput name="description"/>
				</li>

				<li>
				<label>Links: </label>
				<SectionTextInput name="links"/>
				<button onClick={this.handleNewLink}>Add link</button>
				</li>
			</ul>
		</div>

			/* jshint ignore:end */
		);
	},
	handleNewLink: function(e){
		e.preventDefault();	
		guideActions.addLink();
		
	}
})

module.exports = SectionComponent;
