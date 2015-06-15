'use strict';

var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
var DefaultLayout = require('./layouts/default.jsx');
var routeActions = require('./../actions/routes');
var GuideList = require('./guide/guideList.jsx');

var IndexComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="homepage">

            <section className="cover min-window-height">
              <div className="crosshatch container min-window-height">
                <article className="main-info">
                  <div className="inner">
                    <h1 className="title">Crowd-sourced curriculums</h1>
                    <h2 className="description">Sign up and create your own learning path. Share it with the world
                    and help others find the most effective material on the internet.</h2>
                    <a className="waves-effect waves-light btn-large green" onClick={this.handleSignUp}>SIGN UP NOW</a>
                  </div>
                </article>
              </div>
            </section>

            <section className="container">
              <GuideList/>
            </section>

            <section className="about-us">
              <div className="crosshatch container">
                <article>
                  <h1 className="title">About Us</h1>
                  <div className="john-star"></div>
                  <div className="anuj-star"></div>
                  <div className="vince-star"></div>
                  <div className="david-star"></div>
                </article>
              </div>
            </section>

          </div>
        </div>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },

	handleNewGuide: function(e){
		e.preventDefault();
		routeActions.setRoute('/createguide');
	},

  handleSignUp: function(e){
    e.preventDefault();
    routeActions.setRoute('/signup');
  }
});

module.exports = IndexComponent;
