/**
*   Forgot Component Spec Test
*/


'use strict';

var React = require('react');
var ForgotComponent = React.createFactory(require('../../../../client/scripts/components/account/forgot.jsx'));

describe('Forgot Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.forgotComponent = new ForgotComponent();
  });

  it('provides the "Forgot Component" instance', function() {
    // Expect it to exist
    expect(this.forgotComponent).to.be.ok;
  });

});
