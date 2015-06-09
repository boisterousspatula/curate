'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var guideStore = require('../../stores/guides');
var GuideSection = require('./readguidesection.jsx');
var CommentsBox = require('../comment/commentBox.jsx');
var FavoriteButton = require('../favorites/favoriteButton.jsx');


var ReadGuideComponent = React.createClass({

  getInitialState: function () {

    var dummyObj = {
      title: null,
      description: null,
      sections: [],
      userId: null,
      userEmail: null,
      category: null,
      votes: 0,
      comments: [{message:null, author:null}, {message:null, author:null}]
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
        /* jshint ignore:start */
        <GuideSection key={idx} index={idx} sec={sec} guideId={guide.id}/>
        /* jshint ignore:end */

      );
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
	},

});

module.exports = ReadGuideComponent;
