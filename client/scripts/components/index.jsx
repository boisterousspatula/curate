'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var routeActions = require('./../actions/routes');
var GuideList = require('./guide/guideList.jsx');


var IndexComponent = React.createClass({
  render: function() {

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Welcome to Curate!</h1>
            <GuideList/>
          </div>
					<button className="guide-create" onClick={this.handleNewGuide}>Create New Guide</button>
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

module.exports = IndexComponent;
