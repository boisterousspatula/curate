'use strict'

var React = require('react');
var guideStore = require('../../stores/guides');
var inputActions = require('../../actions/input');

var ReadGuideVoteComponent = React.createClass({
  getInitialState: function () {
    return {
      votes: this.props.votes
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

  render: function(){
    return(
      <div className = "vote-container">
      <div name="upvote" linkIndex={this.props.linkIndex} onClick = {this.handleUpvote}>upvote</div>
      <div name="downvote" linkIndex={this.props.linkIndex} onClick = {this.handleDownvote}>downvote</div>
      <div name="votes">{this.state.votes}</div>
     </div>
      )
  },

    handleUpvote: function(e) {
    e.preventDefault();
    var linkIndex = this.props.linkIndex;
    var sectionIndex = this.props.sectionIndex;
    inputActions.upvoteLink(linkIndex, sectionIndex)

  },
  handleDownvote: function(e) {
    e.preventDefault();
    var linkIndex = this.props.linkIndex;
    var sectionIndex = this.props.sectionIndex;
    inputActions.downvoteLink(linkIndex, sectionIndex)

  }
});
module.exports = ReadGuideVoteComponent;