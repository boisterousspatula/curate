'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var SectionLinkList = require('./sectionLinkList.jsx');
var SectionLink = require('./sectionLink.jsx');
var SectionTextInput = require('./sectionTextInput.jsx')

var SectionComponent = React.createClass({


	render: function() {	
		var self = this;
		var linkList = this.props.sec.links.map(function(link, idx){
			/* jshint ignore:start */
			return(
				<SectionLink key={idx} linkidx={idx} index={self.props.index} link={link}/>
				)
			/* jshint ignore:end */
		})

		return (
			/* jshint ignore:start */
		<div>
			<ul>
				<li>

				<label>Section Title: </label>
				<SectionTextInput name="title" index={this.props.index} />
				</li>

				<li>
				<label>Section Description: </label>
				<SectionTextInput name="description" index={this.props.index} />

				</li>

				<li>
				<label>Links: </label>
				{linkList}
				<button onClick={this.handleNewLink}>Add link</button>
				</li>
			</ul>
		</div>

			/* jshint ignore:end */
		);
	},
	handleNewLink: function(e){
		e.preventDefault();	

		var index = this.props.index;
		guideActions.addLink(index);
	}
})

module.exports = SectionComponent;
