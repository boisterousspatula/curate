var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var favoriteActions = require('../../actions/favorites');
var IconButton = mui.IconButton;
var ActionGrade = mui.SvgIcon;
var FontIcon = mui.FontIcon;

var FavoriteButton = React.createClass({
  getInitialState: function() {
    return {};
  },

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

  handleSubmit: function(e) {
    favoriteActions.postFavorite(this.props.guideId);
  },

  render: function() {
    // <button onClick={this.handleSubmit}>Favorite!</button>
    return (
      /* jshint ignore:start */
      
      <a href='#' onClick={this.handleSubmit}><div className="favorite"></div></a>
      
      /* jshint ignore:end */
    );  
  }
});

module.exports = FavoriteButton;
