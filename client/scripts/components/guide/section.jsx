'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var userStore = require('../../stores/user');
var SectionLinkList = require('./sectionLinkList.jsx');

//var getState = function() {
//	return {
//		user: userStore.get()
//	};
//};

var SectionComponent = React.createClass({

	render: function() {

		return (
			/* jshint ignore:start */
			<li>
				<h3>Title: {this.props.sec.title}</h3>
				<h4>Description: {this.props.sec.description}</h4>
				<ul>
					<SectionLinkList links={this.props.sec.links}/>
				</ul>
			</li>
			/* jshint ignore:end */
		);
	},
			handleSubmit: function(e) {
			e.preventDefault();
			//var form = e.currentTarget;
			//userActions.reset(form);
		}
			});

			module.exports = SectionComponent;
