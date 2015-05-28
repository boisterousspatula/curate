'use strict';

var React = require('react');
var SectionTextInput = require('./sectionTextInput.jsx')


var SectionLinkComponent = React.createClass({
	render: function () {
		var index = this.props.index;
		return (
			/* jshint ignore:start */
			<li>
				<SectionTextInput name="link" value={this.props.link[index]}/>
			</li>
			/* jshint ignore:end */
		);
	},
});

module.exports = SectionLinkComponent;
