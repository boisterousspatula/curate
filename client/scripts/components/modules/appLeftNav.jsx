'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var routeActions = require('../../actions/routes');
var Messages = require('../modules/messages.jsx');
var pageStore = require('../../stores/page');
var userStore = require('../../stores/user');
var userActions = require('../../actions/user');
var Navbar = require('../modules/navbar.jsx');

//Load Material-UI Components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var Spacing = mui.Styles.Spacing;
var Typography = mui.Styles.Typography;
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var RaisedButton = mui.RaisedButton;

var menuItems = [
  { route: '/', text: 'LIST OF GUIDES' },
  { route: '/createguide', text: 'CREATE A GUIDE' },
  { route: '/knowrepo', text: 'KNOWLEDGE REPO' },
  { type: MenuItem.Types.SUBHEADER },
  { route: '/signup', text: 'SIGN UP' },
  { route: '/login', text: 'LOG IN' },
  { route: '/logout', text: 'LOG OUT' }
];

var AppLeftNav = React.createClass({

  getStyles: function() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '34px',
      color: '#2E8F29',
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  },

  componentWillMount: function() {
    // this.toggle = this.toggle.bind(this);
    // this._getSelectedIndex = this._getSelectedIndex.bind(this);
    // this._onLeftNavChange = this._onLeftNavChange.bind(this);
    // this._onHeaderClick = this._onHeaderClick.bind(this);
  },

  render: function() {
    /* jshint ignore:start */
    var header = <div className="logo" style={this.getStyles()} onClick={this._onHeaderClick}>≈skill.it!</div>;

    return (
      <LeftNav
        ref="leftNav"
        header={header}
        menuItems={menuItems}
        style={{
          opacity: .8,
          color: '#979797',
          fontSize: '14px',
          fontWeight: Typography.fontWeightBold
        }}
        onChange={this._onLeftNavChange} />
    );
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

/* LIST OF GUIDES: */
// font-family: Roboto-Bold;
// font-size: 36px;
// color: #678387;
// line-height: 104px;