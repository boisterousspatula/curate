'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var guideStore = require('../../stores/guides');
var GuideSection = require('./readguidesection.jsx');

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
      comments: []
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
    var sections = guide.sections.map(function(sec, idx){
      return (
        <GuideSection key={idx} index={idx} sec={sec}/>
        )
    })

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

});

module.exports = ReadGuideComponent;
