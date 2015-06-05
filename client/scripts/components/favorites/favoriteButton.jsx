var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var favoriteActions = require('../../actions/favorites');

var FavoriteButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  handleSubmit: function(e) {
    favoriteActions.postFavorite(this.props.guideId);
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <button onClick={this.handleSubmit}>Favorite!</button>
      /* jshint ignore:end */
    );  
  }
});

module.exports = FavoriteButton;
