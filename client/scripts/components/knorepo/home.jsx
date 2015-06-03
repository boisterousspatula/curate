'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var routeActions = require('../../actions/routes');
var CuratedList = require('../knorepo/curatedList.jsx');
var FavoritesList = require('../knorepo/favoritesList.jsx');
var CommentsBox = require('../comment/commentBox.jsx');


var HomeComponent = React.createClass({
	getInitialState:function(){
		return {guide: 1}
	},
  render: function() {

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Knowledge Repository!</h1>
						<div>
							<button className="guide-create" onClick={this.handleNewGuide}>Create New Guide</button>
            	<CuratedList/>
						</div>
						<div>
							<FavoritesList/>
						</div>
          </div>
					<CommentsBox items={this.state.guide}/>
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
