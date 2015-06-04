'use strict';

var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var MenuItem = mui.MenuItem;
var LeftNav = mui.LeftNav;
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

  //Needed for mui to load theme
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  //Needed for mui to load theme
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    //Initialize left nav menu items
    var menuItems = [
      { route: '/', text: 'LIST OF GUIDES' },
      { route: '/createguide', text: 'CREATE GUIDE' },
      { route: 'knorepo', text: 'KNOWLEDGE REPO' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Disabled',
         disabled: true
      },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://www.google.com',
         text: 'Disabled Link',
         disabled: true
      },
    ];

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <LeftNav menuItems={menuItems} />,
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
