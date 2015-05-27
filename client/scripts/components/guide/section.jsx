'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var SectionLinkList = require('./sectionLinkList.jsx');
var SectionLink = require('./sectionLink.jsx');
var SectionTextInput = require('./sectionTextInput.jsx')

var SectionComponent = React.createClass({

	render: function() {
		var linkList = this.props.list.map(function(link, idx){
			/* jshint ignore:start */
			return(
				<SectionLink key={idx} index={idx} link={link}/>
				)
			/* jshint ignore:end */
		})

		return (
			/* jshint ignore:start */
		<div>
			<ul>
				<li>
				<label>Title: </label>
				<SectionTextInput name="title" value={this.props.sec.title}/>
				</li>

				<li>
				<label>Description: </label>
				<SectionTextInput name="description" value={this.props.sec.description}/>
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
