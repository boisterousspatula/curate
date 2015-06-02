'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
//var Guide = require('./guide.jsx');
var knowRepoStore = require('../../stores/knowrepo');

var FavsComponent = React.createClass({

	componentDidMount: function() {
		knowRepoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		knowRepoStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			guides: knowRepoStore.getFavGuides()
		})
	},

	getInitialState: function () {
		return {
			guides : knowRepoActions.getHome()
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
							<h6>{val.title}</h6>

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
				<th>Favs List</th>
				{guideList}
			</table>
			/* jshint ignore:end */
		);
	}
});

module.exports = FavsComponent;
