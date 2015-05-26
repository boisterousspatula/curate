'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var routeActions = require('./../actions/routes');

var IndexComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Welcome to Curate!</h1>
            <p>
              Take a look at the <a href="https://github.com/larsonjj/generator-yeogurt#yeogurt-generator">documentation</a> and start mixing up something awesome.
            </p>
            <p>
              <img src="/images/yeogurt-swirl.png" width="75px" className="logo" />
            </p>
          </div>
					<button className="guide-create" onClick={this.handleNewGuide}>Create New Guide</button>
        </div>
        <code className="version">v0.14.5</code>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },
	handleNewGuide: function(e){

		e.preventDefault();
		routeActions.setRoute('/createguide');
	}
});

module.exports = IndexComponent;
