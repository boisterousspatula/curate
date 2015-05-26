'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');
var sectionStore = require('../../stores/sections');
var Section = require('./section.jsx');


var SectionListComponent = React.createClass({

	render: function () {
		console.log(this.props.sections);
		var sectionList = this.props.sections;
		var htmlSections = sectionList.map(function(sec,idx){
			/* jshint ignore:start */
			return (
				<Section key={idx} sec={sec}/>
			);
			/* jshint ignore:end */
		});
		return (
			/* jshint ignore:start */

			<ul>
				{htmlSections}
			</ul>
			/* jshint ignore:end */
		);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = SectionListComponent;
