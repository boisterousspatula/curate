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

	render: function() {
    var guide = this.state.guide
    var sections = guide.sections.map(function(sec, idx){
      return (
        <GuideSection key={idx} index={idx} sec={section}/>
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
