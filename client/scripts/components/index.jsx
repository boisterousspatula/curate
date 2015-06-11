'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var DefaultLayout = require('./layouts/default.jsx');
var routeActions = require('./../actions/routes');
var GuideList = require('./guide/guideList.jsx');

var IndexComponent = React.createClass({

  render: function() {
      // <div className="row">
        // <div className="col s6">

    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="homepage">

            <section className="cover min-window-height">
              <div className="container min-window-height">
                <article className="main-info">
                  <div className="inner">
                    <h1 className="title">Crowd-sourced Curriculums</h1>
                    <h2 className="description">Sign up and create your own learning path. Share it with the world
                    and help others find the most effective material on the internet.</h2>
                    <a className="waves-effect waves-light btn-large green">SIGN UP NOW</a>
                  </div>
                </article>
              </div>
            </section>

            <section className="guide-list col offset-s4">
              <GuideList/>
            </section>

            </div>
              <button className="guide-create" onClick={this.handleNewGuide}>Create New Guide</button>
              <a className="btn-floating btn-large waves-effect waves-light red"><i className="mdi-content-add"></i></a>
            </div>

          </div>
        </div>
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
