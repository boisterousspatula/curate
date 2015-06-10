'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var routeActions = require('../../actions/routes');
var CuratedList = require('../knorepo/curatedList.jsx');
var FavoritesList = require('../knorepo/favoritesList.jsx');


var HomeComponent = React.createClass({
	// getInitialState:function(){
	// 	//return;
	// },
	render: function() {

		return (
			/* jshint ignore:start */
			<DefaultLayout>
				<div>
					<h1>Knowledge Repository!</h1>
					<button className="btn waves-effect waves-light red" onClick={this.handleNewGuide}>Create New Guide
						<i className="mdi-content-add right"></i>
					</button>
					<CuratedList/>
					<br/>
					<div className="divider"> </div>
					<br/>
					<FavoritesList/>
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
