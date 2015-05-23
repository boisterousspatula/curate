/**
*   Reset Component Spec Test
*/


'use strict';

var React = require('react');
var ResetComponent = React.createFactory(require('../../../../client/scripts/components/account/reset.jsx'));

describe('Reset Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.resetComponent = new ResetComponent();
  });

  it('provides the "Reset Component" instance', function() {
    // Expect it to exist
    expect(this.resetComponent).to.be.ok;
  });

});
