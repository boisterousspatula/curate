'use strict';

var React = require('react');
var Router = require('react-router');
var Messages = require('../modules/messages.jsx');
var pageStore = require('../../stores/page');
var userStore = require('../../stores/user');

//Load Material-UI Components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;
var AppLeftNav = require('../modules/appLeftNav.jsx');
var MenuItem = mui.MenuItem;
var Navbar = require('../modules/navbar.jsx');
var RaisedButton = mui.RaisedButton;


var getState = function() {
  return {
    title: pageStore.get().title,
    user: userStore.get()
  };
};

var DefaultComponent =  React.createClass({

  mixins: [pageStore.mixin, userStore.mixin],

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

  //Set current theme
  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  componentDidMount: function() {
    pageStore.emitChange();
    userStore.emitChange();
  },

  getInitialState: function() {
    return getState();
  },

  render: function() {
        // <div className="main-nav">
        //   <Navbar user={this.state.user} />
        // </div>

    return (
      /* jshint ignore:start */
      <div>
        <div>
          <AppLeftNav
            ref="leftNav"/>
        </div>
        <div className="default">
          <div className="main-container">
            <div className="messages">
              <Messages messages={this.state.messages} />
            </div>
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
          // <AppBar onLeftIconButtonTouchTap={this._showLeftNavClick} title="Navigation" />

  },

  _showLeftNavClick: function() {
    this.refs.leftNav.toggle();
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = DefaultComponent;
