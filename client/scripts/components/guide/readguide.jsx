'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var SectionList = require('./sectionList.jsx');
var sectionStore = require('../../stores/sections');
var SectionTextInput = require('./sectionTextInput.jsx')



var GuideComponent = React.createClass({
	getInitialState: function () {
    var guideId = this.props.id;
		return {
      guide: guideActions.getGuide(guideId)
		}
	},
	componentDidMount: function() {
  	sectionStore.addChangeListener(this._onChange);
  },

	componentWillUnmount: function() {
    sectionStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
  	this.setState({
  		sections: sectionStore.get()
  	})
  },

	render: function() {
		return (
			/* jshint ignore:start */
			<DefaultLayout>
        <div className="main-container">
					<form method="post" action="/guide" onSubmit={this.handleSubmit}>
            <div className="guide-headers">
            <ul>
              <li>
              <label>Guide Title: </label>
                <SectionTextInput name="guideTitle"/>
              </li>
              <li>
              <label>Guide Description: </label>
                <SectionTextInput name="guideDescription"/>
						</li>
            </ul>
            </div>
            <SectionList sections={this.state.sections}/>
						<input type="submit" name="save"></input>
				</form>
				</div>
			</DefaultLayout>
			/* jshint ignore:end */
		);

	},


	handleSubmit: function(e) {
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

module.exports = GuideComponent;
