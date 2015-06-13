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
    return {
      favorited: false
    };
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

  _onFav: function(){
    var newState = !this.state.favorited
    this.setState({
      favorited: newState
    })
    this.handleSubmit();
  },

  render: function() {
    // <button onClick={this.handleSubmit}>Favorite!</button>
    return (
      /* jshint ignore:start */

      <a href='#' onClick={this._onFav}>
      {this.state.favorited ? 
        <i className="small mdi-action-favorite"></i> :
        <i className="small mdi-action-favorite-outline"></i>}
      </a>

      
      /* jshint ignore:end */
    );  
  }
});

module.exports = FavoriteButton;
