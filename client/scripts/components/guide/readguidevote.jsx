'use strict'

var React = require('react');
var guideStore = require('../../stores/guides');
var inputActions = require('../../actions/input');

var ReadGuideVoteComponent = React.createClass({
  getInitialState: function () {
    return {
      votes: this.props.votes || 0
    }
  },
   componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    if(this.props.type === 'link'){
      var linkIndex = this.props.linkIndex;
      var sectionIndex = this.props.sectionIndex;
      this.setState({
       votes: guideStore.getLinkVotes(linkIndex, sectionIndex)
     })
    }
    else if(this.props.type ==='guide'){
      var index = this.props.index;
      this.setState({
        votes: guideStore.getGuideVotes(index)
      })
    }
  },

  render: function(){
    return(
      <div className='voteContainer'>
        <div className='arrow-up' name='upvote' linkIndex={this.props.linkIndex} onClick={this.handleUpvote}></div>
        <div className='votes'>{this.state.votes}</div>
        <div className='arrow-down' name='downvote' linkIndex={this.props.linkIndex} onClick={this.handleDownvote}></div>
     </div>
      )
  },

    handleUpvote: function(e) {
    e.preventDefault();
    var type = 'upvote';
    var linkIndex = this.props.linkIndex;
    var sectionIndex = this.props.sectionIndex;
    var linkId = this.props.linkId;
    var guideId = this.props.guideId;
    inputActions.postLinkVote(type, linkId, guideId, linkIndex, sectionIndex)

  },
  handleDownvote: function(e) {
    e.preventDefault();
    var type = 'downvote';
    var linkIndex = this.props.linkIndex;
    var sectionIndex = this.props.sectionIndex;
    var linkId = this.props.linkId;
    var guideId = this.props.guideId;
    inputActions.postLinkVote(type, linkId, guideId, linkIndex, sectionIndex)

  }
});
module.exports = ReadGuideVoteComponent;