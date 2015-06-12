'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var knowRepoActions = require('../../actions/knowRepo');
var guideActions = require('../../actions/guide');
var routeActions = require('../../actions/routes');
var knowRepoStore = require('../../stores/knowrepo');

var CuratedComponent = React.createClass({

	componentDidMount: function() {
		knowRepoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		knowRepoStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			guides: knowRepoStore.getUserGuides()
		});
	},

	getInitialState: function() {
		return {
			guides : knowRepoActions.getHome()
		};
	},

	render: function() {
		var guideList = null;
		console.log('in curated list, this.state.guides:', this.state.guides);
		if (this.state.guides) {
			if(this.state.guides.length !== 0) {
				guideList = this.state.guides.sort(function (a, b) {
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
			} else {
				guideList = (
					/* jshint ignore:start */
					<div>
						<div className="messaging">You have not curated any guides</div>
					</div>
					/* jshint ignore:end */
				);
			}
		}
		// else {
		// 	guideList = (
		// 			/* jshint ignore:start */
		// 			<div className="collection-header">
		// 				<h6>You have not curated any guides</h6>
		// 			</div>
		// 			/* jshint ignore:end */
		// 	);
		// }
		return (
			/* jshint ignore:start */
			<div>
				<h4 className="left-align">YOUR CURATED GUIDES</h4>
				<ul>
					{guideList}
				</ul>
			</div>
			/* jshint ignore:end */
		);
	},
	handleClick: function(i){

		guideActions.passGuideId(this.state.guides[i].id);
		routeActions.setRoute('/readguide');
	}
});

module.exports = CuratedComponent;
