'use strict';

var React = require('react');
var SectionTextInput = require('./sectionTextInput.jsx')


var SectionLinkComponent = React.createClass({
	getInitialState: function(){
		return{
			value: this.props.value || ''
		}
	},
	render: function () {
		var index = this.props.index;
		return (
			/* jshint ignore:start */
			<li>
				<SectionTextInput name="link" value ={this.state.value} />
			</li>
			/* jshint ignore:end */
		);
	},


});

module.exports = SectionLinkComponent;
