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
			<div className="contentCard">
					<label>Title: </label>
					<SectionTextInput name="linkTitle"  linkidx={this.props.linkidx} index={this.props.index} />

					<label>URL: </label>
					<SectionTextInput name="links" linkidx={this.props.linkidx} index={this.props.index} />

					<label>Content Type: </label>
					<SectionMenuList menuItems={this.state.contentTypes} value="Course" default={0} name="contentTypes" linkidx={this.props.linkidx} index={this.props.index}/>

					<label>Estimated Time to Completion: </label>
					<SectionMenuList menuItems={this.state.timeRanges} value="10" default={0} name="linkDuration" linkidx={this.props.linkidx} index={this.props.index}/>

					<label>Description: </label>
					<SectionTextInput name="linkDescription" isMultiLine="true" linkidx={this.props.linkidx} index={this.props.index} />
			</div>
			/* jshint ignore:end */
		);
	}
});

module.exports = SectionLinkComponent;
