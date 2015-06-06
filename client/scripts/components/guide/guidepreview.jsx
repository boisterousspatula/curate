'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var inputActions = require('../../actions/input');
var routeActions = require('../../actions/routes');
var VoteComponent = require('./vote.jsx');

var GuidePreviewComponent = React.createClass({
  render: function() {
    var guide = this.props.guide;
    return (
      /* jshint ignore:start */
      <tr>
        <td>
          <h4 guideId={this.props.guide.id} onClick={this.handleClick}>{guide.title}</h4>
          <div>
            <p>{guide.description}</p>
          </div>
           <VoteComponent votes={guide.votes} type="guide" index={this.props.index} onDownvote={this.handleDownvote} onUpvote={this.handleUpvote}/>
        </td>
      </tr>
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
   var index = this.props.index
   var guideid = this.props.id;
   inputActions.postGuideVote(guideid, name, index);
  }
});

module.exports = GuidePreviewComponent;
