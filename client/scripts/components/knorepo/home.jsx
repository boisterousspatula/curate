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
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Knowledge Repository!</h1>
						<div>
            	<CuratedList/>
							<button className="guide-create" onClick={this.handleNewGuide}>Create New Guide</button>
						</div>
						<div>
							<FavoritesList/>
						</div>
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
