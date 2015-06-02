'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var guideStore = require('../../stores/guide');
var GuideSection = require('./readguidesection')

var ReadGuideComponent = React.createClass({
  getInitialState: function () {
    var guideId = this.props.id;
    return {
      guide: guideActions.getGuide(guideId)
    }
  },
  componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      votes: guideStore.getVotes()
    })
  },

  render: function() {
 
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <ul>
            {sections}
          </ul>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },

  handleVote: function(e) {
    e.preventDefault();
    //console.log('in handle submit view', e.currentTarget);
    var form = e.currentTarget;
    this.setState({
      sections: sectionStore.get(),
      guide: sectionStore.getGuide().guide
    })
    guideActions.postGuide(this.state.sections, this.state.guide);
  }

});

module.exports = ReadGuideComponent;
