'use strict';

var React = require('react');
var guideStore = require('../../stores/guides');
var GuideSection = require('./readguidesection.jsx');

var VoteComponent = React.createClass({
  getInitialState: function () {
    var guideId = this.props.id;
    return {
      votes: this.props.votes || 0,
      hasVoted: this.props.hasVoted
    }
  },
  
  componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    if(this.props.type === "link"){
      var linkIndex = this.props.linkIndex;
      var sectionIndex = this.props.sectionIndex;
      this.setState({
       votes: guideStore.getLinkVotes(linkIndex, sectionIndex)
     })
    }
    else if(this.props.type ==="guide"){
      var index = this.props.index
      this.setState({
        votes: guideStore.getGuideVotes(index)
      })
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
     <div className = "vote-container">
      <div name="upvote" onClick = {this.props.onUpvote}>upvote</div>
      <div name="downvote" onClick = {this.props.onDownvote}>downvote</div>
      <div name="votes">{this.props.votes}</div>
     </div>
      /* jshint ignore:end */
    );
  },



});

module.exports = VoteComponent;
