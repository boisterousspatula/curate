'use strict';

var React = require('react');
var SectionTextInput = require('./sectionTextInput.jsx');
var SectionMenuList = require('./sectionMenuList.jsx');
var defaultContentTypes = require('../../constants/defaults').contentTypes;
var timeRange = require('../../constants/defaults').timeRange;
var inputActions = require('../../actions/input');


var SectionLinkComponent = React.createClass({
	getInitialState: function () {
		return {
			timeRanges : timeRange,
			contentTypes : defaultContentTypes
		};
	},
	render: function () {
		var index = this.props.index;
		return (
			/* jshint ignore:start */
			<div >
				<div className="row">
					<SectionTextInput placeholder="Title" name="linkTitle"  linkidx={this.props.linkidx} index={this.props.index} />
				</div >
				<div className="row">
					<SectionTextInput placeholder="URL" name="links" linkidx={this.props.linkidx} index={this.props.index} />
				</div >
				<div className="row">
					<label>Content Type: </label>
					<SectionMenuList menuItems={this.state.contentTypes} name="contentTypes" linkidx={this.props.linkidx} index={this.props.index}/>

					<label>Estimated Time to Completion: </label>
					<SectionMenuList menuItems={this.state.timeRanges} name="linkDuration" linkidx={this.props.linkidx} index={this.props.index}/>
				</div>
				<div className="row">
					<SectionTextInput isMultiLine={true} placeholder="Description" name="linkDescription" isMultiLine="true" linkidx={this.props.linkidx} index={this.props.index} />
				</div>
			</div>
			/* jshint ignore:end */
		);
	}
});

module.exports = SectionLinkComponent;
