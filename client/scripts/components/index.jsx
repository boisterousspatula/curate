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
              <div className="crosshatch containers min-window-height">
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

            <section className="containers guides">
              <GuideList/>
            </section>

            <section className="about-us">
              <div className="crosshatch containers">
                <h1 className="aboutTitle">Meet the Team</h1>
                <div className="people">
                  <div className="john">
                    <div className="name">John Yeglinski</div>
                      <div className="social">
                        <a href="https://github.com/jyeg">
                          <div className="git"></div>
                        </a>
                        <a href="https://www.linkedin.com/in/johnyeg">
                          <div className="linkd"></div>
                        </a>
                      </div>
                  </div>
                  <div className="anuj">
                   <div className="name">Anuj Tomar</div>
                    <div className="social">
                      <a href="https://github.com/tomarak">
                        <div className="git"></div>
                      </a>
                      <a href="https://www.linkedin.com/in/tomarak">
                        <div className="linkd"></div>
                      </a>
                    </div>
                  </div>
                  <div className="vince">
                    <div className="name">Vince Tam</div>
                      <div className="social">
                      <a href="https://github.com/waterdoo">
                        <div className="git"></div>
                      </a>
                      <a href="https://www.linkedin.com/in/vincetam">
                        <div className="linkd"></div>
                      </a>
                    </div>
                  </div>
                  <div className="david">
                    <div className="name">David Hopper</div>
                      <div className="social">
                        <a href="https://github.com/davidhopper">
                          <div className="git"></div>
                          </a>
                        <a href="https://www.linkedin.com/in/dphopper">
                          <div className="linkd"></div>
                        </a>
                      </div>
                  </div>
                </div>
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
