'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var Guide = require('./guide.jsx');
var guideStore = require('../../stores/guides');

var GuideComponent = React.createClass({

	mixin: [guideStore.mixin],

	_onChange: function(){
		this.setState({
			guides: guideStore.get();
		})
	},

	getInitialState: function () {
		return {
			guides : guideActions.getGuides()
		};
	},
	render: function() {
		if (this.state.guides) {

		var guideList = this.state.guides.sort(function (a, b) {
			return b.votes - a.votes;
		}).map(function (val, idx) {
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
		}
		return (
			/* jshint ignore:start */
			<table className="top-guides">
					{guideList}
			</table>
				/* jshint ignore:end */
		);
	}
});

module.exports = GuideComponent;
