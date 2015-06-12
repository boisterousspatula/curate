'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var routeActions = require('../../actions/routes');
var CuratedList = require('../knorepo/curatedList.jsx');
var FavoritesList = require('../knorepo/favoritesList.jsx');


var HomeComponent = React.createClass({
	render: function() {

		return (
			/* jshint ignore:start */
			<DefaultLayout>
			<div className="container">
				<div className="guideList">
					<div className="callToAction">Knowledge Repository</div>
					<CuratedList/>
					<FavoritesList/>
				</div>
			</div>
			</DefaultLayout>
			/* jshint ignore:end */
		);
	},
	handleNewGuide: function(e){
		e.preventDefault();
		routeActions.setRoute('/createguide');
	}
});

module.exports = HomeComponent;
