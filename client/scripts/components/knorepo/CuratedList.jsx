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
		})
	},

	getInitialState: function () {
		return {
			guides : knowRepoActions.getHome()
		};
	},

	render: function() {
		var guideList = null;
		if (this.state.guides) {
			guideList = this.state.guides.sort(function (a, b) {
				return b.votes - a.votes;
			}).map(function (val, idx) {
				return (
					/* jshint ignore:start */
					<li className="collection-item" key={idx} onClick={this.handleClick.bind(this,idx)}>
						<span className="title">{val.title}</span>
						<p className="truncate">{val.description}</p>
					</li>

					/* jshint ignore:end */
				)
			}, this);
		}else{
			guideList = (
					/* jshint ignore:start */
					<li className="collection-header">
						<h6>You have not curated any guides</h6>
					</li>
					/* jshint ignore:end */
			);
		}
		return (
			/* jshint ignore:start */
			<div>
				<h4 className="left-align">Curated List</h4>
				<ul className="collection">
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
