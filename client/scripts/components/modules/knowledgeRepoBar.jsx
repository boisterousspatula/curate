'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Router = require('react-router');
var routeActions = require('../../actions/routes');
var knowRepoActions = require('../../actions/knowRepo');
var Messages = require('../modules/messages.jsx');
var pageStore = require('../../stores/page');
var userStore = require('../../stores/user');
var knowRepoStore = require('../../stores/knowrepo');


//Load Material-UI Components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Navbar = require('../modules/navbar.jsx');
var RaisedButton = mui.RaisedButton;

//Pre-load default menu items for rendering
var menuItems = [
  { type: MenuItem.Types.SUBHEADER, text: 'Favorite Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'test'
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'test'
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];

var KnowledgeRepoBar = React.createClass({

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

  componentWillMount: function() {
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
    this.setState({
      guides: knowRepoActions.getFavsForKnowRepoBar()
    });
  },

  componentDidMount: function() {
    knowRepoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    knowRepoStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      guides: knowRepoStore.getFavGuides()
    });
  },

  // getInitialState: function () {
  //   return {
  //     guides : knowRepoActions.getFavsForKnowRepoBar()
  //   };
  // },

  render: function() {
    var favGuidesLoaded = this.state.guides;
    console.log('kno repo loaded fav guides', favGuidesLoaded);

    //Load Kno Repo Bar once Fav Guides are Loaded
    if(favGuidesLoaded) {
      var favGuides = favGuidesLoaded.guides;

      //Update menu items once favs are loaded
      menuItems = favGuides.map(function(guide){
        return {
          type: MenuItem.Types.LINK,
          payload: 'https://github.com/callemall/material-ui',
          text: guide.title,
          id: guide.id
        };
      });
    }

    /* jshint ignore:start */
    var header = <div className="logo" onClick={this._onHeaderClick}>≈skill.it!</div>;

    return (
      <LeftNav
        ref="knowledgeRepoBar"
        openRight = {true}
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
    /* jshint ignore:end */

    // selectedIndex={this._getSelectedIndex()}
  },

  toggle: function() {
    this.refs.knowledgeRepoBar.toggle();
  },

  _getSelectedIndex: function() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) {
        console.log('knowledge repo bar selected index:', i);
        return i;
      }
    }
  },

  _onHeaderClick: function() {
    this.context.router.transitionTo('root');
    this.refs.leftNav.close();
  },

  _onLeftNavChange: function(e, key, payload) {
    routeActions.setRoute(payload.route);
  },

});

module.exports = KnowledgeRepoBar;
