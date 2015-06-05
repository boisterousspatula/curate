'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var guideStore = require('../../stores/guides');
var GuideSection = require('./readguidesection.jsx');
var CommentsBox = require('../comment/commentBox.jsx');
var FavoriteButton = require('../favorites/favoriteButton.jsx')

var ReadGuideComponent = React.createClass({

  getInitialState: function () {

    var dummyObj = {
      title: 'test title',
      description: 'blah',
      sections: [],
      userId: 1,
      userEmail: 'ankuto@gmail.com',
      category: null,
      votes: 0,
      comments: [{message:'fake', author:'tester'}, {message:'another fake', author:'tester1'}]
    };

    var guideId = guideStore.getId();
    guideActions.getGuide(guideId);
    
    return {
      // guide: guideStore.get(),
      id: guideId,
      guide: dummyObj
	  };
  },

  componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      guide: guideStore.get()
    });
  },

	render: function() {
    var guide = this.state.guide;
    var sections = guide.sections.map(function(sec, idx) {
      return (
        <GuideSection key={idx} index={idx} sec={sec}/>
      )
    });
    
		return (
			/* jshint ignore:start */
			<DefaultLayout>
        <div className="main-container">
          <h3>
            {this.state.guide.title}
          </h3>
          <h4>
            {this.state.guide.description}
          </h4>
          <FavoriteButton guideId={this.state.id} />
          <ul>
            {sections}
          </ul>
				<CommentsBox guideId={this.state.id} comments={guide.comments}/>
				</div>
			</DefaultLayout>
			/* jshint ignore:end */
		);
	}

});

module.exports = ReadGuideComponent;
