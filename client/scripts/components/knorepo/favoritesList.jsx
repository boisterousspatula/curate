'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
var guideActions = require('../../actions/guide');
var routeActions = require('../../actions/routes');
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
		});
	},

	getInitialState: function () {
		return {
			guides : knowRepoActions.getHome()
		};
	},

	render: function() {
		if (this.state.guides) {
			var guideList = this.state.guides.guides.sort(function (a, b) {
				return b.votes - a.votes;
			}).map(function (val, idx) {
				return (
					/* jshint ignore:start */
					<div className="collection-item guidePreviewContainer" key={idx} onClick={this.handleClick.bind(this,idx)}>
						<div className="guidePreviewTitle">{val.title}</div>
						<p className="guidePreviewDescription truncate">{val.description}</p>
					</div>
					/* jshint ignore:end */
				);
			}, this);
		}
		return (
			/* jshint ignore:start */
			<div>
				<h4>FAVORITES</h4>
				<div>
					{guideList}
				</div>
			</div>
			/* jshint ignore:end */
		);
	},
	handleClick: function(i){
		guideActions.passGuideId(this.state.guides.guides[i].id);
		routeActions.setRoute('/readguide');
	}
});
module.exports = FavsComponent;
