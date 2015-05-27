'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var SectionList = require('./sectionList.jsx');
var sectionStore = require('../../stores/sections');



var GuideComponent = React.createClass({
	getInitialState: function () {
		sectionStore.init();
		return {
			sections: sectionStore.get()
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
						<SectionList sections={this.state.sections}/>

						<input type="submit" name="save"></input>
				</form>
				</div>
			</DefaultLayout>
		);
	},

	handleSubmit: function(e) {
		e.preventDefault();
		//console.log('in handle submit view', e.currentTarget);
		var form = e.currentTarget;
		guideActions.createGuide(form);
	}


});

module.exports = GuideComponent;
