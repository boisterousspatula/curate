'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin'); //here?
var DefaultLayout = require('./layouts/default.jsx');
var routeActions = require('./../actions/routes');
var GuideList = require('./guide/guideList.jsx');

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var IndexComponent = React.createClass({
  render: function() {

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>≈skill.it!</h1>
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
