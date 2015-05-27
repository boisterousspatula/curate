'use strict';

var React = require('react');

var SectionLinkComponent = React.createClass({
	render: function () {
		return (
			/* jshint ignore:start */
			<li>
				{this.props.link}
			</li>
			/* jshint ignore:end */
		);
	},
});

module.exports = SectionLinkComponent;
