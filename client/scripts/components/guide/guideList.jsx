'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var userActions = require('../../actions/user');
var Guide = require('./guide.jsx');
var guideStore = require('../../stores/guides');

var GuideComponent = React.createClass({
	getInitialState: function () {
		return {
			guides : guideStore.get()
		};
	},
	render: function() {
		var guideList = this.state.guides.sort(function(a,b) {
			return  b.votes - a.votes;
		}).map(function(val, idx){
			return (
				/* jshint ignore:start */
				<tr key={idx}>
					<td>
						<h4>{val.title}</h4>
						<div>
							<b>{val.votes}</b>
							<br/>
							<p>{val.description}</p>
						</div>
					</td>
				</tr>
				/* jshint ignore:end */
			)
		});

		return (
			/* jshint ignore:start */
			<table>
					{guideList}
			</table>
				/* jshint ignore:end */
		);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		//var form = e.currentTarget;
		//userActions.reset(form);
	}
});

module.exports = GuideComponent;
