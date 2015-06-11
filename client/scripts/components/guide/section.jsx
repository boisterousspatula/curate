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
				<div className="row">
					<SectionTextInput placeholder="Section Title:" name="title" index={this.props.index} />
				</div>
				<br/>
				<div className="row">
					<SectionTextInput name="description" placeholder="Section Description:" index={this.props.index} />
				</div>
				<br/>
				<div className="row">
					<button className="btn waves-effect waves-light green" onClick={this.handleNewLink}>
						<i className="mdi-content-add right"></i>
						Add link
					</button>
				</div>
				<div className="row">
					<h6>Add content for your section: </h6>
					{linkList}
				</div>
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
