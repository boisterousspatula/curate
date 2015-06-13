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
			<div className="guideContentContainer">
				<div className="row">
					<SectionTextInput className="col" placeholder="Section Title:" name="title" index={this.props.index} />
				</div>
				<div className="row">
					<SectionTextInput className="col" name="description" placeholder="Section Description:" index={this.props.index} />
				</div>

				<div className="row">
					<h4 className="linkHeader">Link</h4>
					{linkList}
				</div>
				<button className="btn waves-effect waves-light green" onClick={this.handleNewLink}>
					<i className="mdi-content-add right"></i>
					Add link
				</button>

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
