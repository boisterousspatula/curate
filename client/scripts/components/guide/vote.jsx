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
    else if(this.props.type ==="readGuide"){
      this.setState({
        votes: guideStore.getGuideVotes()
      })
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
     <div className = "voteContainer">
      <div className='arrow-up' name="upvote" onClick = {this.props.onUpvote}></div>
      <div className='votes' name="votes">{this.props.votes}</div>
      <div className='arrow-down' name="downvote" onClick = {this.props.onDownvote}></div>
      
     </div>
      /* jshint ignore:end */
    );
  },



});

module.exports = VoteComponent;
