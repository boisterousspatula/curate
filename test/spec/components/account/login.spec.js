/**
*   Login Component Spec Test
*/


'use strict';

var React = require('react');
var LoginComponent = React.createFactory(require('../../../../client/scripts/components/account/login.jsx'));

describe('Login Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.loginComponent = new LoginComponent();
  });

  it('provides the "Login Component" instance', function() {
    // Expect it to exist
    expect(this.loginComponent).to.be.ok;
  });

});
