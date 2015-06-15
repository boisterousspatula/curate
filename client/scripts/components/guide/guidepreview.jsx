'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var inputActions = require('../../actions/input');
var routeActions = require('../../actions/routes');
var VoteComponent = require('./vote.jsx');
var FavoriteButton = require('../favorites/favoriteButton.jsx');

//Load Material Components
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');
var Paper = mui.paper;
var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

var GuidePreviewComponent = React.createClass({

  getInitialState: function(){
    return {
      hasVoted: false
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

  render: function() {

    var guide = this.props.guide;

    return (
      /* jshint ignore:start */
      <div>
          <tr>
            <td>
            <div className="guidePreviewContainer">
              <div className="guidePreviewTitle" guideId={this.props.guide.id} onClick={this.handleClick}>{guide.title}
              </div>

              <div className="guidePreviewDescription">
                <p>{guide.description}</p>
              </div>

              <div>
               <VoteComponent votes={guide.votes} type="guide" index={this.props.index} onDownvote={this.handleDownvote} onUpvote={this.handleUpvote}/>
               </div>

               <div className="guidePreviewFavsandCreator">
                <span className="numFavs">Curated by {guide.creator}</span>
                <span className="favContainer mdi-action-favorite-outline"></span>
                <span className="favContainer numFavs">2</span>
               </div>
            </div>
            </td>
          </tr>
      </div>
      /* jshint ignore:end */
    );
  },

  handleClick: function(e){
    var id = this.props.guide.id;

    guideActions.passGuideId(id);
    routeActions.setRoute('/readguide');
  },

  handleUpvote: function(e) {
    e.preventDefault();
    var name = 'upvote';
    var index = this.props.index;
    var guideid = this.props.id;

    inputActions.postGuideVote(guideid, name, index);
  },

  handleDownvote: function(e) {
   e.preventDefault();
   var name = 'downvote';
   var index = this.props.index;
   var guideid = this.props.id;
   inputActions.postGuideVote(guideid, name, index);
  }
});

module.exports = GuidePreviewComponent;
