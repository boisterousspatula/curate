'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
//var Guide = require('./guide.jsx');
var guideStore = require('../../stores/guides');
var GuidePreview = require('./guidepreview.jsx');

var GuideListComponent = React.createClass({

  componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

	_onChange: function(){
		this.setState({
			guides: guideStore.get()
		});
	},

	getInitialState: function () {
		return {
			guides : guideActions.getGuides()
		};
	},

	render: function() {
		var self = this;
		if (this.state.guides) {
			var guideList = this.state.guides.sort(function (a, b) {
				return b.votes - a.votes;
			}).map(function (guide, idx) {
				return (
					/* jshint ignore:start */
					<GuidePreview key={idx} guide={guide}/>
					/* jshint ignore:end */
				);
			});
		}

		return (
			/* jshint ignore:start */
			<table className="top-guides">
					{guideList}
			</table>
				/* jshint ignore:end */
		);
	}
});

module.exports = GuideListComponent;

// 	<tr key={idx} guideId={guide.id}>
				// 	<td>
				// 		<h4 onClick={self.handleGetGuide}>{guide.title}</h4>
				// 		<div>

				// 			<b>{guide.votes}</b>
				// 			<br/>

				// 			<p>{guide.description}</p>
				// 		</div>
				// 	</td>
			//	</tr>
