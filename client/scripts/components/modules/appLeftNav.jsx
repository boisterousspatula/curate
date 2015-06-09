'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var routeActions = require('../../actions/routes');
var Messages = require('../modules/messages.jsx');
var pageStore = require('../../stores/page');
var userStore = require('../../stores/user');
var userActions = require('../../actions/user');

//Load Material-UI Components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Navbar = require('../modules/navbar.jsx');
var RaisedButton = mui.RaisedButton;

var menuItems = [
  { route: '/', text: 'LIST OF GUIDES' },
  { route: '/createguide', text: 'CREATE A GUIDE' },
  { route: '/knowrepo', text: 'KNOWLEDGE REPO' },
  { route: '/signup', text: 'CREATE ACCOUNT' },
  { route: '/login', text: 'LOGIN' },
  { route: '/logout', text: 'LOGOUT' }
];

var AppLeftNav = React.createClass({

  componentWillMount: function() {
    this.toggle = this.toggle.bind(this);
    // this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  },

  render: function() {
    /* jshint ignore:start */
    var header = <div className="logo" onClick={this._onHeaderClick}>≈skill.it!</div>;

    return (
      <LeftNav
        ref="leftNav"
        header={header}
        menuItems={menuItems}
        onChange={this._onLeftNavChange} />
    );
        // selectedIndex={this._getSelectedIndex()}
    /* jshint ignore:end */

  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  _onHeaderClick: function() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  },

  _onLeftNavChange: function(e, key, payload) {
    if(payload.route === '/logout') {
      userActions.logout();
    }
    routeActions.setRoute(payload.route);
  },

});

module.exports = AppLeftNav;
